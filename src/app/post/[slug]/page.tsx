import { Metadata } from 'next';
import { findPublicPostBySlugFromApiCached } from '@/lib/post/queries/public';
import { SinglePost } from '@/components/SinglePost';
import { Suspense } from 'react';
import { SpinLoader } from '@/components/SpinLoader';

export const dynamic = 'force-static';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postRes = await findPublicPostBySlugFromApiCached(slug);

  if (!postRes.success) {
    return {};
  }

  const post = postRes.data;

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
