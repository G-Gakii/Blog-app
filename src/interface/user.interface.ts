export interface Iuser {
  _id: string;
  username: string;
  email: string;
  password: string;
  refreshToken?: string | null;
  isValidPassword(password: string): Promise<boolean>;
}
