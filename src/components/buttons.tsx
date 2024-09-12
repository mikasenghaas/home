"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link as LinkType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ButtonProps {
  link: LinkType | undefined;
}

export function ArxivButton({ link }: ButtonProps) {
  if (!link) return null;
  
  const button = (
    <Button
      onClick={() => window.open(link.href, '_blank', 'noopener,noreferrer')}
      variant="outline"
      className="group"
    >
      <Image src="/svg/arxiv.svg" alt="arXiv logo" height={16} width={16} className="mr-2" />
      {link.title}
      <ArrowUpRight className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px]" size={18} />
    </Button>
  );

  if (link.description) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{link.description}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}

export function GenericButton({ link }: ButtonProps) {
  if (!link) return null;

  const isExternalUrl = link.href.startsWith('http://') || link.href.startsWith('https://');

  const buttonContent = (
    <>
      {link.title}
      {isExternalUrl && (
        <ArrowUpRight className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px]" size={18} />
      )}
    </>
  );

  const buttonProps = {
    variant: "outline" as const,
    className: "group text-foreground",
  };

  if (link.description) {
    return (
        <Tooltip>
          <TooltipTrigger asChild>
            {isExternalUrl ? (
              <Button
                onClick={() => window.open(link.href, '_blank', 'noopener,noreferrer')}
                {...buttonProps}
              >
                {buttonContent}
              </Button>
            ) : (
              <Link href={link.href} passHref>
                <Button {...buttonProps}>
                  {buttonContent}
                </Button>
              </Link>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{link.description}</p>
          </TooltipContent>
        </Tooltip>
    );
  }

  return isExternalUrl ? (
    <Button
      onClick={() => window.open(link.href, '_blank', 'noopener,noreferrer')}
      {...buttonProps}
    >
      {buttonContent}
    </Button>
  ) : (
    <Link href={link.href} passHref>
      <Button {...buttonProps}>
        {buttonContent}
      </Button>
    </Link>
  );
}