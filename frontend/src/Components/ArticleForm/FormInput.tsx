import { formGridItem, formInput } from "./ArticleForm.styles";

type InputTag = "input" | "textarea";

type FormInputProps<T extends InputTag = "input"> = {
  as?: T;
  label: string;
  id: string;
  className?: string;
  wrapperClassName?: string;
  value: string;
} & (T extends "textarea"
  ? React.TextareaHTMLAttributes<HTMLTextAreaElement>
  : React.InputHTMLAttributes<HTMLInputElement>);

function FormInput<T extends InputTag = "input">({
  as,
  label,
  className = formInput(),
  wrapperClassName = formGridItem(),
  id,
  value,
  ...rest
}: FormInputProps<T>) {
  const Component = (as ?? "input") as React.ElementType;
  return (
    <p className={wrapperClassName}>
      <label htmlFor={id}>{label}</label>

      <Component
        id={id}
        name={id}
        className={className}
        value={value}
        {...rest}
      />
    </p>
  );
}

export default FormInput;
