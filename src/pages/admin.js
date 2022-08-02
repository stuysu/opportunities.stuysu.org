import React from "react";
import { Helmet } from "react-helmet";
import { Grid } from "@mui/material";
import OpportunityForm from "../comps/opportunities/OpportunityForm";

const Admin = () => {
  return (
    <div>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <OpportunityForm>

          </OpportunityForm>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
