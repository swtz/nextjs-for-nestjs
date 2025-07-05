import Link from 'next/link';
import clsx from 'clsx';
import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import ErrorMessage from '@/components/ErrorMessage';
import { DeletePostButton } from '../DeletePostButton';

export async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

  if (posts.length <= 0)
    return (
      <ErrorMessage contentTitle='Ei!' content='Que tal criar algum post? 🙃' />
    );

  return (
    <div className='mb-16'>
      Hello, PostPage!
      {posts.map(post => (
        <div
          className={clsx(
            'p-2',
            !post.published && 'bg-slate-300',
            'flex gap-2 items-center',
            'xs:justify-between',
          )}
          key={post.id}
        >
          <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
          {!post.published && (
            <span className='text-xs text-slate-600 italic'>
              (Não publicado)
            </span>
          )}

          <DeletePostButton id={post.id} title={post.title} />
        </div>
      ))}
    </div>
  );
}
