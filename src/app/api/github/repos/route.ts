import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const CACHE_DURATION = 3600; // Cache for 1 hour

// In-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');

    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'Missing owner or repo parameter' },
        { status: 400 }
      );
    }

    const cacheKey = `${owner}/${repo}`;
    const cached = cache.get(cacheKey);

    // Check if we have cached data that's still fresh
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION * 1000) {
      return NextResponse.json(cached.data, {
        headers: {
          'X-Cache': 'HIT',
          'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        },
      });
    }

    // Fetch from GitHub API
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // Add authentication if token is available
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers }
    );

    if (!response.ok) {
      // If rate limited, return cached data if available (even if stale)
      if (response.status === 403 && cached) {
        return NextResponse.json(cached.data, {
          headers: {
            'X-Cache': 'STALE',
            'X-RateLimit-Remaining': response.headers.get('X-RateLimit-Remaining') || '0',
          },
        });
      }

      return NextResponse.json(
        { error: `GitHub API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Update cache
    cache.set(cacheKey, { data, timestamp: Date.now() });

    // Also store rate limit info in response headers
    const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
    const rateLimitReset = response.headers.get('X-RateLimit-Reset');

    return NextResponse.json(data, {
      headers: {
        'X-Cache': 'MISS',
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        ...(rateLimitRemaining && { 'X-RateLimit-Remaining': rateLimitRemaining }),
        ...(rateLimitReset && { 'X-RateLimit-Reset': rateLimitReset }),
      },
    });
  } catch (error) {
    console.error('GitHub API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Batch endpoint to fetch multiple repos at once
export async function POST(request: NextRequest) {
  try {
    const { repos } = await request.json();

    if (!Array.isArray(repos)) {
      return NextResponse.json(
        { error: 'Invalid request body, expected { repos: Array<{ owner: string, repo: string }> }' },
        { status: 400 }
      );
    }

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const results = await Promise.all(
      repos.map(async ({ owner, repo }) => {
        const cacheKey = `${owner}/${repo}`;
        const cached = cache.get(cacheKey);

        // Return cached data if fresh
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION * 1000) {
          return { owner, repo, data: cached.data, cached: true };
        }

        try {
          const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}`,
            { headers }
          );

          if (!response.ok) {
            // Return cached data even if stale on error
            if (cached) {
              return { owner, repo, data: cached.data, cached: true, stale: true };
            }
            throw new Error(`${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          cache.set(cacheKey, { data, timestamp: Date.now() });

          return { owner, repo, data, cached: false };
        } catch (error) {
          // If there's an error and we have cached data, use it
          if (cached) {
            return { owner, repo, data: cached.data, cached: true, stale: true };
          }
          return { owner, repo, error: error.message };
        }
      })
    );

    return NextResponse.json(results, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error('GitHub batch API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
