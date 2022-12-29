import React from "react";
import { Helmet } from "react-helmet";
import { Box } from "@mui/material";
import OpportunityForm from "../comps/opportunities/OpportunityForm";
import AuthenticationRequired from "../comps/auth/AuthenticationRequired";
import FacultyRequired from "../comps/auth/FacultyRequired";
import UserContext from "../comps/context/UserContext";

const Admin = () => {
  const user = React.useContext(UserContext);
  if (!user.signedIn) return <AuthenticationRequired />;
  if (!user.isFaculty) return <FacultyRequired />

  return (
    <div>
      <Helmet>
        <title>Admin</title>
      </Helmet>

      <Box>
        <OpportunityForm>

        </OpportunityForm>
      </Box>
    </div>
  );
};

export default Admin;
