import Link from 'next/link';
import clsx from 'clsx';
import { findAllPostsFromApiAdmin } from '@/lib/post/queries/admin';
import ErrorMessage from '@/components/ErrorMessage';
import { DeletePostButton } from '../DeletePostButton';

export async function PostsListAdmin() {
  const postsRes = await findAllPostsFromApiAdmin();

  if (!postsRes.success) {
    console.log(postsRes.errors);

    return (
      <ErrorMessage
        contentTitle='Ei!'
        content='Tente fazer login de novo! 🙃'
      />
    );
  }

  const posts = postsRes.data;

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
