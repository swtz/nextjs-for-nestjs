'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { useEffect } from 'react';

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error, reset }: RootErrorPageProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <ErrorMessage
      pageTitle='Internal Server Error'
      contentTitle='Erro 501'
      content={
        <button
          className='cursor-pointer hover:underline'
          onClick={() => reset()}
        >
          Clique aqui para recarregar essa parte do site. Se não funcionar,
          tenta mais tarde.
        </button>
      }
    />
  );
}
