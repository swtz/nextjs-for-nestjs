import clsx from 'clsx';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostsCached } from '@/lib/post/queries/public';

export async function PostsList() {
  const posts = await findAllPublicPostsCached();

  if (posts.length <= 1) return null;

  return (
    <div
      className={clsx(
        'grid grid-cols-1',
        'gap-8 mb-16',
        'sm:grid-cols-2',
        'md:grid-cols-3',
      )}
    >
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;

        return (
          <div className='flex flex-col gap-4 group' key={post.id}>
            <div className='flex flex-col'>
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
            </div>

            <PostSummary
              postHeading='h2'
              postLink={postLink}
              createdAt={post.createdAt}
              excerpt={post.excerpt}
              title={post.title}
            />
          </div>
        );
      })}
    </div>
  );
}
