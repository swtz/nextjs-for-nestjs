import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type PostCoverImageProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
};

export function PostCoverImage({ imageProps, linkProps }: PostCoverImageProps) {
  return (
    <Link
      {...linkProps}
      className={clsx(
        'w-full',
        'h-full',
        'overflow-hidden',
        'rounded-2xl',
        linkProps.className,
      )}
    >
      <Image
        {...imageProps}
        className={clsx(
          'group-hover:scale-105',
          'w-full',
          'h-full',
          'object-cover',
          'object-center',
          'transition',
          imageProps.className,
        )}
        alt={imageProps.alt}
      />
    </Link>
  );
}
