import clsx from 'clsx';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';

type PostSummaryProps = {
  postHeading: 'h1' | 'h2';
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
};

export function PostSummary({
  postHeading,
  postLink,
  createdAt,
  excerpt,
  title,
}: PostSummaryProps) {
  return (
    <div
      className={clsx('flex flex-col gap-3', 'sm:justify-center sm:gap-2.5')}
    >
      <PostDate dateTime={createdAt} />

      <PostHeading as={postHeading} url={postLink}>
        {title}
      </PostHeading>

      <p>{excerpt}</p>
    </div>
  );
}
