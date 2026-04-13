import type { UserDataFieldName } from '@shared/types/userdata';

export type FieldName = UserDataFieldName | 'repeatPassword';
export type FormFields = Partial<Record<FieldName, string>>;
export type FormErrors = Partial<Record<FieldName, string>>;
