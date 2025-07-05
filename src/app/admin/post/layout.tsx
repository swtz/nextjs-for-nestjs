import { MenuAdmin } from '@/components/Admin/MenuAdmin';
import { requireLoginSessionOrRedirect } from '@/lib/login/manage-login';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPostLayout({
  children,
}: Readonly<AdminLayoutProps>) {
  await requireLoginSessionOrRedirect();

  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
