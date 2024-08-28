"use client"

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/lib/types';
import Image from 'next/image';
import { Button } from './ui/button';

interface ArxivButtonProps {
  link: Link | undefined;
}

export function ArxivButton({ link }: ArxivButtonProps) {
  if (!link) return null;
  return (
    <Button
      onClick={() => window.open(link.href, '_blank', 'noopener,noreferrer')}
      variant="outline"
      className="group"
    >
      <Image src="/svg/arxiv-small.svg" alt="arXiv logo" height={16} width={16} className="mr-2" />
      {link.title}
      <ArrowUpRight className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px]" size={18} />
    </Button>
  );
}
