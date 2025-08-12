import { Metadata } from 'next';
import { Suspense } from 'react';
import { SpinLoader } from '@/components/SpinLoader';
import { UpdateUserForm } from '@/components/UpdateUserForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'User Admin',
};

export default async function AdminUserPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <UpdateUserForm />
    </Suspense>
  );
}
