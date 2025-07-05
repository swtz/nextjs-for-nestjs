import clsx from 'clsx';
import Link from 'next/link';

type PostHeadingProps = {
  className?: string;
  url: string;
  children: React.ReactNode;
  as?: 'h1' | 'h2';
};

export function PostHeading({
  children,
  className = '',
  url,
  as: Tag = 'h1',
}: PostHeadingProps) {
  const headingClassMap = {
    h1: clsx('text-2xl/tight font-extrabold sm:text-3xl md:text-4xl'),
    h2: clsx('text-2xl/tight font-bold sm:text-2xl md:text-3xl'),
  };

  return (
    <Tag className={clsx(headingClassMap[Tag], className)}>
      <Link className='hover:text-slate-600 transition' href={url}>
        {children}
      </Link>
    </Tag>
  );
}
