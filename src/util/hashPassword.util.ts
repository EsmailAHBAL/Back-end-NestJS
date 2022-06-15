import * as bcrypt from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function PasswordHashing(password: string) {
  return await bcrypt.hash(password, 10);
}
