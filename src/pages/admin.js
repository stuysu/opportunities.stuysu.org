import React from "react";
import { Helmet } from "react-helmet";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import OpportunityForm from "../comps/opportunities/OpportunityForm";
import AuthenticationRequired from "../comps/auth/AuthenticationRequired";
import FacultyRequired from "../comps/auth/FacultyRequired";
import UserContext from "../comps/context/UserContext";

const Admin = () => {
  const user = React.useContext(UserContext);
  const [searchParams] = useSearchParams();;

  if (!user.signedIn) return <AuthenticationRequired />;
  if (!user.isFaculty) return <FacultyRequired />

  
  let opportunity = false;
  if (searchParams.get("edit") == "true") {
    opportunity = {
      id: parseInt(searchParams.get("id")),
      title: searchParams.get("title"),
      description: searchParams.get("description"),
      date: searchParams.get("date"),
      appDeadline: searchParams.get("appdeadline"),
      cost: searchParams.get("cost"),
      link: searchParams.get("link")
    }
  }
  
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
