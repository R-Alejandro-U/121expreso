export interface IRegister {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

export interface IErrors {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

export interface IRegisterFormProps {
  data: IRegister;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errors: IErrors | undefined;
}