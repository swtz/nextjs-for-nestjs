import { notFound } from 'next/navigation';
import Image from 'next/image';
import { findPublicPostBySlugFromApiCached } from '@/lib/post/queries/public';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';
import { SafeMarkdown } from '../SafeMarkdown';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const postRes = await findPublicPostBySlugFromApiCached(slug);
  const postLink = `/post/${slug}`;

  if (!postRes.success) {
    notFound();
  }

  const post = postRes.data;

  return (
    <article className='mb-16'>
      <header className='flex flex-col gap-4'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
          priority
        />

        <PostHeading url={postLink}>{post.title}</PostHeading>

        <p>
          {post.author.name} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>

      <p className='text-lg mb-4 text-slate-700 sm:text-xl'>{post.excerpt}</p>

      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
