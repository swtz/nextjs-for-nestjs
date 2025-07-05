import Link from 'next/link';

export function Footer() {
  return (
    <footer className='pb-12 text-center'>
      <p>
        <span>Copyright &copy; {new Date().getFullYear()} — </span>
        <Link className='hover:underline' href='/'>
          The Blog
        </Link>
      </p>
    </footer>
  );
}
