import { Stack, StandardTextFieldProps, TextField } from "@mui/material";

interface InputTextProps extends StandardTextFieldProps {
  errorMessage?: string | null;
}

const InputText = (props: InputTextProps) => {
  const {
    name,
    type,
    value,
    label,
    errorMessage,
    variant,
    onChange,
    onBlur,
    ...rest
  } = props;

  return (
    <Stack direction="column" mb={3} width="100%" justifyContent="start">
      <TextField
        {...rest}
        id="outlined-basic"
        name={name}
        type={type || "text"}
        value={value}
        label={label}
        variant={variant || "outlined"}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </Stack>
  );
};
export default InputText;
