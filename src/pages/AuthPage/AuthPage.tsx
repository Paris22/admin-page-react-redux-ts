import React from "react";
import Logo from "../../assets/Logo.svg";
import { alts } from "../../constants/alts";

export const AuthPage = () => {
  return (
    <div>
      AuthPage
      <img src={Logo} width={450} height={450} alt={alts.LOGO} loading="lazy" />
    </div>
  );
};
