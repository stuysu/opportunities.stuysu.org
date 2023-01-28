import React from "react";
import { Helmet } from "react-helmet";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import OpportunityForm from "../comps/opportunities/OpportunityForm";
import AuthenticationRequired from "../comps/auth/AuthenticationRequired";
import FacultyRequired from "../comps/auth/FacultyRequired";
import UserContext from "../comps/context/UserContext";

const Admin = () => {
  const user = React.useContext(UserContext);
  const location = useLocation();

  if (!user.signedIn) return <AuthenticationRequired />;
  if (!user.isFaculty) return <FacultyRequired />

  
  let opportunity = location?.state;  // returns null on no state

  return (
    <div>
      <Helmet>
        <title>Admin</title>
      </Helmet>

      <Box>
        {
          opportunity ? <OpportunityForm {...opportunity} /> : <OpportunityForm />
        }
      </Box>
    </div>
  );
};

export default Admin;
