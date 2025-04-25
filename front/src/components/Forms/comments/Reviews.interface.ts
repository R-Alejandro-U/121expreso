/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IReviewsFormProps {
  data: string;
  setNewComment: (event: any) => void;
  handleSubmitComment: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  message: string;
}