"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/section";
import { Frosted } from "@/components/frosted";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface GitHubRepo {
  full_name: string;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface RepoData {
  owner: string;
  repo: string;
  url: string;
}

interface BatchRepoResult {
  owner: string;
  repo: string;
  data?: GitHubRepo;
  error?: string;
  cached?: boolean;
  stale?: boolean;
}

const REPOS: RepoData[] = [
  {
    owner: "PrimeIntellect-ai",
    repo: "prime-rl",
    url: "https://github.com/PrimeIntellect-ai/prime-rl",
  },
  {
    owner: "willccbb",
    repo: "verifiers",
    url: "https://github.com/willccbb/verifiers",
  },
  {
    owner: "PrimeIntellect-ai",
    repo: "prime-environments",
    url: "https://github.com/PrimeIntellect-ai/prime-environments",
  },
];

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  "PrimeIntellect-ai/prime-rl": "Decentralized RL Training at Scale",
  "willccbb/verifiers": "Verifiers for LLM Reinforcement Learning",
  "PrimeIntellect-ai/prime-environments": "Environments for distributed AI training",
};

const FALLBACK_AVATARS: Record<string, string> = {
  "PrimeIntellect-ai": "https://avatars.githubusercontent.com/u/163882149?s=200&v=4",
  "willccbb": "https://avatars.githubusercontent.com/u/7961990?v=4",
};

function RepoCard({ repoData, githubData }: { repoData: RepoData; githubData?: GitHubRepo | null }) {
  const [loading, setLoading] = useState(!githubData);

  useEffect(() => {
    if (githubData !== undefined) {
      setLoading(false);
    }
  }, [githubData]);

  if (loading) {
    return (
      <Frosted className="flex h-full min-h-[220px] animate-pulse flex-col justify-between overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700 md:h-6 md:w-6"></div>
            <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-14 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="space-y-1">
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </Frosted>
    );
  }

  return (
    <a
      href={repoData.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full transition-transform hover:scale-[1.02] hover:no-underline"
    >
      <Frosted className="flex p-6 sm:p-8 h-full min-h-[200px] sm:min-h-[220px] flex-col justify-between overflow-hidden">
        <div className="space-y-2">
          <div className="flex w-full items-center gap-2">
            <img 
              src={githubData?.owner?.avatar_url || FALLBACK_AVATARS[repoData.owner] || `https://github.com/${repoData.owner}.png`} 
              alt={repoData.owner}
              className="flex-shrink-0 rounded h-8 w-8"
            />
            <h3 className="m-0 min-w-0 flex-1 truncate font-semibold text-xl">
              {githubData?.name || repoData.repo}
            </h3>
          </div>
          <p className="line-clamp-2 text-left text-base text-muted-foreground py-2">
            {githubData?.description || 
             FALLBACK_DESCRIPTIONS[`${repoData.owner}/${repoData.repo}`] || 
             "Loading description..."}
          </p>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          {githubData?.language && (
            <div className="flex items-center gap-1">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: getLanguageColor(githubData.language),
                }}
              />
              <span>{githubData.language}</span>
            </div>
          )}
          {githubData?.stargazers_count !== undefined && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{formatStarCount(githubData.stargazers_count)}</span>
            </div>
          )}
        </div>
      </Frosted>
    </a>
  );
}

function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Rust: "#dea584",
    Go: "#00ADD8",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    Ruby: "#701516",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Shell: "#89e051",
  };
  return colors[language] || "#808080";
}

export function OSS() {
  const [reposData, setReposData] = useState<Record<string, GitHubRepo | null>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all repos at once using the batch API
    const fetchAllRepos = async () => {
      try {
        const response = await fetch('/api/github/repos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            repos: REPOS.map(({ owner, repo }) => ({ owner, repo }))
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch repos: ${response.statusText}`);
        }
        
        const results: BatchRepoResult[] = await response.json();
        
        // Build repos data map
        const dataMap: Record<string, GitHubRepo | null> = {};
        results.forEach((result) => {
          const key = `${result.owner}/${result.repo}`;
          dataMap[key] = result.data || null;
        });
        
        setReposData(dataMap);
      } catch (error) {
        console.error('Error fetching repos:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch repositories');
        // Set empty data on error so we still show fallback content
        const emptyMap: Record<string, GitHubRepo | null> = {};
        REPOS.forEach(({ owner, repo }) => {
          emptyMap[`${owner}/${repo}`] = null;
        });
        setReposData(emptyMap);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRepos();
  }, []);

  return (
    <Section className="relative overflow-x-visible">
      <h2 className="mb-8 mt-0">OSS</h2>
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
          <p className="text-sm">Error loading GitHub data: {error}</p>
          <p className="text-xs mt-1">Showing cached information</p>
        </div>
      )}
      <div className="relative -mx-5 md:-mx-[calc((100vw-1000px)/2)] 2xl:-mx-[calc((100vw-1280px)/2)]">
        <div className="mx-auto max-w-screen-2xl px-5 md:px-10 lg:px-20">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8">
            {REPOS.map((repoData) => {
              const key = `${repoData.owner}/${repoData.repo}`;
              return (
                <RepoCard 
                  key={key} 
                  repoData={repoData} 
                  githubData={reposData[key]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
