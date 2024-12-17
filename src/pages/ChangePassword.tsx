import React from "react";
import { ResetPassword } from "../components/ResetPassword";
import Layout from "../components/Layout";

const ChangePassword = () => {
  return (
    <Layout pageTitle="Changement de mot de passe">
      <ResetPassword />
    </Layout>
  );
};

export default ChangePassword;
