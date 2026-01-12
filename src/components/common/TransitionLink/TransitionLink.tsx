"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, type MouseEvent } from "react";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export function TransitionLink({
  children,
  href,
  className,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Add a small delay to ensure fade-out completes
    await new Promise((resolve) => setTimeout(resolve, 200));

    router.push(href);
  };

  return (
    <Link
      href={href}
      onClick={handleTransition}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
