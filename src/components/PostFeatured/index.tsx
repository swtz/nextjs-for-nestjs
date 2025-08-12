import clsx from 'clsx';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostsFromApiCached } from '@/lib/post/queries/public';
import ErrorMessage from '../ErrorMessage';

export async function PostFeatured() {
  const postsRes = await findAllPublicPostsFromApiCached();

  const noPostFound = (
    <ErrorMessage
      contentTitle='Ops!'
      content='Ainda não criamos nenhum post 😅'
    />
  );

  if (!postsRes.success) {
    return noPostFound;
  }

  const posts = postsRes.data;

  if (posts.length <= 0) {
    return noPostFound;
  }

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
