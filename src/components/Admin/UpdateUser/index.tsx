import ErrorMessage from '@/components/ErrorMessage';
import { UpdateUserForm } from '@/components/UpdateUserForm';

export async function UpdateUser() {
  const user = await getPublicUserFromApi();

  if (!user) {
    return (
      <ErrorMessage
        contentTitle='Ops...'
        content='Você precisa fazer login novamente.'
      />
    );
  }

  return <UpdateUserForm user={user} />;
}
