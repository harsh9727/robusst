import React from "react";
import Link from "next/link";

// types
import type { Blog } from "~/types";

// components
import { Button } from "~/components/ui/button";

interface BlogCardProps {
  data: Blog;
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
};

export const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  return (
    <div className="flex w-full flex-col justify-between rounded-xl">
      {/*<div className="relative min-h-[180px] w-full overflow-hidden rounded-t-xl">
        <Image
          src={data.coverImage}
          alt="blogImage"
          fill
          className="object-cover object-top"
        />
      </div>*/}

      <div className="flex h-full w-full flex-col justify-between rounded-b-xl bg-[#f9f9f9] px-3 py-3">
        <div>
          <p className="text-body-muted text-xs">
            {formatDate(data.date)} | {data.author.name}
          </p>
          <h3 className="mt-1 text-base leading-tight font-semibold sm:font-medium">
            {data.title}
          </h3>
        </div>

        <Button asChild variant="default" size="sm" className="w-fit">
          <Link
            href={`/blogs/${data.slug}`}
            aria-label={`Read: ${data.title}`}
            className="text-brand mt-3 text-xs font-medium"
          >
            Read Article
          </Link>
        </Button>
      </div>
    </div>
  );
};
