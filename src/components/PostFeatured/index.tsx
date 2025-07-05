import clsx from 'clsx';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostsCached } from '@/lib/post/queries/public';
import ErrorMessage from '../ErrorMessage';

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();

  if (posts.length <= 0)
    return (
      <ErrorMessage
        contentTitle='Ops!'
        content='Ainda não criamos nenhum post 😅'
      />
    );

  const post = posts[0];
  const postLink = `/post/${post.slug}`;

  return (
    <section
      className={clsx('grid grid-cols-1 gap-8 mb-16', 'sm:grid-cols-2 group')}
    >
      <PostCoverImage
        linkProps={{ href: postLink }}
        imageProps={{
          src: post.coverImageUrl,
          alt: post.title,
          width: 1200,
          height: 720,
          priority: true,
        }}
      />
      <PostSummary
        postHeading='h1'
        postLink={postLink}
        createdAt={post.createdAt}
        excerpt={post.excerpt}
        title={post.title}
      />
    </section>
  );
}
