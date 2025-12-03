import { formGridItem, formInput } from "../ArticleForm/ArticleForm.styles";

type InputTag = "input" | "textarea";

type FormInputProps<T extends InputTag = "input"> = {
  as?: T;
  label: string;
  id: string;
  className?: string;
  wrapperClassName?: string;
} & (T extends "textarea"
  ? React.TextareaHTMLAttributes<HTMLTextAreaElement>
  : React.InputHTMLAttributes<HTMLInputElement>);

function FormInput<T extends InputTag = "input">({
  as,
  label,
  className = formInput(),
  wrapperClassName = formGridItem(),
  id,
  ...rest
}: FormInputProps<T>) {
  const Component = (as ?? "input") as React.ElementType;
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="text-xs">
        {label}
      </label>

      <Component id={id} name={id} className={className} {...rest} />
    </div>
  );
}

export default FormInput;
