export type TUser = {
  email: string;
  lastName: string;
  firstName: string;
  password?: string;
  id?: number;
  birthdate?: Date;
  description?: string;
  nationality?: string;
  picture?: string | null;
};
