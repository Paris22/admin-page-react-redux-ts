import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import { errors } from "../../../constants/errors";

export const Error = () => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {errors.RESPONSE_ERROR}
    </Alert>
  );
};
