'use client';

import clsx from 'clsx';

type ErrorMessageProps = {
  pageTitle?: string;
  contentTitle: string;
  content: React.ReactNode;
};

export default function ErrorMessage({
  pageTitle = '',
  contentTitle,
  content,
}: ErrorMessageProps) {
  return (
    <>
      {pageTitle && <title>{pageTitle}</title>}
      <div
        className={clsx(
          'min-h-[320px] bg-slate-900 text-slate-100',
          'mb-16 p-8 rounded-xl',
          'flex flex-col item-center justify-center text-center',
        )}
      >
        <div>
          <h1 className='text-4xl font-bold mb-4'>{contentTitle}</h1>
          <div className='text-3xl'>{content}</div>
        </div>
      </div>
    </>
  );
}
