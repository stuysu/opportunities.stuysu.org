import React from "react";
import { Helmet } from "react-helmet";
import { Box } from "@mui/material";
import OpportunityForm from "../comps/opportunities/OpportunityForm";

const Admin = () => {
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
