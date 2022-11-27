import React from "react";
import Logo from "../../assets/Logo.min.svg";
import { alts } from "../../constants/alts";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/paths";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img src={Logo} width={300} height={300} alt={alts.LOGO} loading="lazy" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h2" gutterBottom>
          Oh no...
        </Typography>
        <Typography variant="h4" gutterBottom>
          You go wrong way, Samurai...
        </Typography>
        <Button
          variant="outlined"
          sx={{ width: "fit-content" }}
          onClick={() => navigate(Paths.Home)}
        >
          Go to dashboard
        </Button>
      </Box>
    </Box>
  );
};
