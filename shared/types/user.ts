export type UserId = number;

export type User = {
  id: UserId;
  email: string;
  password: string;
  username: string;
};

export type UserDTO = Omit<User, 'password'>;
