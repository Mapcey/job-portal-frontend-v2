import { TextField } from "@mui/material";

export default function FormTextField({ label, ...props }) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      label={label}
      {...props}
    />
  );
}
