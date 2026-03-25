'use client';

import dynamic from 'next/dynamic';

const BlogComments = dynamic(() => import('./BlogComments'), {
  ssr: false,
  loading: () => (
    <div className="mt-12 pt-8 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-800 rounded w-48" />
          <div className="h-4 bg-slate-800 rounded w-24" />
        </div>
      </div>
    </div>
  ),
});

interface BlogCommentsLoaderProps {
  postSlug: string;
  locale?: string;
}

export default function BlogCommentsLoader({ postSlug, locale }: BlogCommentsLoaderProps) {
  return <BlogComments postSlug={postSlug} locale={locale} />;
}
