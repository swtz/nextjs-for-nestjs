import { hashPassword } from '@/lib/login/manage-login';

(async () => {
  const myPassword = ''; // delete your password from here after generating it
  const passwordHashedInBase64 = await hashPassword(myPassword);

  console.log({ passwordHashedInBase64 });
})();
