type FormRowProps = {
  name: string;
  type: string;
  labelText?: string;
  //TODO: add type
  // onChange: any;
};

export const FormRow = ({ type, name, labelText }: FormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        required
      />
    </div>
  );
};
