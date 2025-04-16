import { IErrors } from "../../../../utils/Errors.interface";

export interface DataLogin {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  data: DataLogin;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void | object>;
  errors: IErrors;
}
