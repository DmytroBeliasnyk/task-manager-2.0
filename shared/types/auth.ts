export type AuthFieldName = 'username' | 'email' | 'password';
export type AuthErrors = Partial<Record<AuthFieldName, string>>;
