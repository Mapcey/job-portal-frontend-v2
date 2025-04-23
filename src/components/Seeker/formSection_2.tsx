import React from "react";
import TextField from "@mui/material/TextField";

const formSection_2 = () => {
  return (
    <div className="form-section-2-container">
      <div className="fs-text-inputs-2">
        <TextField
          label="Phone number"
          variant="outlined"
          placeholder="Add a valid phone number"
          className="text-input-1"
        />

        <TextField
          label="Email"
          variant="outlined"
          placeholder="Add your email address"
          className="text-input-1"
        />
      </div>
      <div className="fs-text-inputs-2">
        <TextField
          label="Phone number"
          variant="outlined"
          placeholder="Add a valid phone number"
          className="text-input-1"
        />

        <TextField
          label="Email"
          variant="outlined"
          placeholder="Add your email address"
          className="text-input-1"
        />
      </div>
    </div>
  );
};

export default formSection_2;
