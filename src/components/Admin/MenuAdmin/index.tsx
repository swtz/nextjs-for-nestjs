'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import {
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from 'lucide-react';
import clsx from 'clsx';
import { logoutAction } from '@/actions/login/logout-action';

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navClasses = clsx(
    'bg-slate-900 text-slate-100 rounded-lg',
    'flex flex-col',
    'mb-8',
    'sm:flex-row sm:flex-wrap',
    !isOpen && 'h-10',
    !isOpen && 'overflow-hidden',
    'sm:overflow-auto sm:h-auto',
  );
  const linkClasses = clsx(
    '[&>svg]:w-[16px] [&>svg]:h-[16px] px-4',
    'flex items-center gap-2 cursor-pointer',
    'transition hover:bg-slate-800 rounded-lg',
    'h-10',
    'shrink-0',
  );
  const openCloseBtnClasses = clsx(
    linkClasses,
    'text-blue-200 italic',
    'sm:hidden',
  );

  function handleLogout(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <nav className={navClasses}>
      <button
        onClick={() => setIsOpen(s => !s)}
        className={openCloseBtnClasses}
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}

        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>

      <a className={linkClasses} href='/' target='_blank'>
        <HouseIcon />
        Home
      </a>

      <Link className={linkClasses} href='/admin/post'>
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClasses} href='/admin/post/new'>
        <PlusIcon />
        Criar Post
      </Link>

      <a onClick={handleLogout} href='#' className={linkClasses}>
        {isPending && (
          <>
            <HourglassIcon />
            Aguarde...
          </>
        )}

        {!isPending && (
          <>
            <LogOutIcon />
            Sair
          </>
        )}
      </a>
    </nav>
  );
}
