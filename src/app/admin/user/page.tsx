import { Metadata } from 'next';
import { Suspense } from 'react';
import { SpinLoader } from '@/components/SpinLoader';
import { UpdateUser } from '@/components/Admin/UpdateUser';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'User Admin',
};

export default async function AdminUserPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <UpdateUser />
    </Suspense>
  );
}
