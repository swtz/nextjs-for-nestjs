import { MenuAdmin } from '@/components/Admin/MenuAdmin';
import { requireLoginSessionForApiOrRedirect } from '@/lib/login/manage-login';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPostLayout({
  children,
}: Readonly<AdminLayoutProps>) {
  await requireLoginSessionForApiOrRedirect();

  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
