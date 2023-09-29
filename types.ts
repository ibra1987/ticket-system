export type NavLink = {
  name: string;
  path: string;
};

export type FormInputAttr = {
  value: string;
  type: string;
  placeholder: string;
};

export type ButtonProps = {
  disabled: boolean;
  text: string;
  handler: () => void;
  type: "submit" | "button";
  cssClass: string;
};

export type Feature = {
  title: string;
  description: string;
};
export type Testimonial = {
  name: string;
  title: string;
  photo: string;
  body: string;
  source: "PRO" | "Client";
};
export enum AccountType {
  customer,
  Professional,
}

export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  organizations?: Organization[];
};

export type NewUser = Record<
  keyof Omit<User, "id" | "organizations" | "isVerified">,
  FormInputAttr
> & {
  passwordConfirmation: FormInputAttr;
};

export type Organization = {
  id: string;
  name: string;
  description: string;
  category: string;
  collaborators: Collaborator[];
  tickets: Ticket[];
  userId: string;
};

export type Collaborator = {
  id: string;
  name: string;
  userName: string;
  email?: string;
  organizations: Organization[];
  tickets: Ticket[];
};

export type Ticket = {
  id: string;
  title: string;
  mainMessage: string;
  attachements: string;
  organizationId: String;
  messages: Message[];
  collaborators: Collaborator[];
};

export type Message = {
  id: string;
  title: string;
  body: string;
  attachement: string[];
  ticketId: string;
};

type Permissions = "All" | "Edit" | "Delete" | "Respond" | "Read";

export interface AccountField {
  value: string;
  type: string;
  placeholder?: string;
}

export type FormErrorType = {
  errorMessages: string[];
  path: string;
};
