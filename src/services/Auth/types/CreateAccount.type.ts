export type CreateAccountType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "shooter" | "instructor";
  validationCode?: string;
  regiment?: string;
  military_id?: string;
};
