type ApiStatus = "idle" | "loading" | "success" | "error";

export type Mode = "create" | "edit";

export interface Status {
  status: ApiStatus;
  errors?: string[];
}

export interface Form {
  title: string;
  image: string;
  article: string;
  tags: string[];
}

export interface Props {
  initialData?: Form;
  onSubmit: (f: Form) => Promise<Response>;
  mode: Mode;
}
