export type UserDataFieldName = 'username' | 'email' | 'password';
export type UserDataErrors = Partial<Record<UserDataFieldName, string>>;
