type FormRowProps = {
  name: string;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
};

export const FormRow = ({
  name,
  type,
  value,
  handleChange,
  labelText,
}: FormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};
