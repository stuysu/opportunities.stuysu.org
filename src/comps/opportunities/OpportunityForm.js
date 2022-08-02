import { Grid, TextField } from "@mui/material";
import React from "react";

const OpportunityForm = (opportunity = {}) => {
  const [title, setTitle] = React.useState(opportunity.title || "");
  const [date, setDate] = React.useState(opportunity.date || "");
  const [appDeadline, setAppDeadline] = React.useState(
    opportunity.appDeadline || ""
  );
  const [cost, setCost] = React.useState(opportunity.cost || "");
  const [location, setLocation] = React.useState(opportunity.location || "");
  const [link, setLink] = React.useState(opportunity.link || "");
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            variant={"outlined"}
            label={"Title"}
            value={title}
            placeholder={"Summer Youth Employment Program"}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            variant={"outlined"}
            label={"Date"}
            value={date}
            placeholder={"June 20 - August 12"}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            variant={"outlined"}
            label={"Deadline"}
            value={appDeadline}
            placeholder={"2022-05-06"}
            onChange={(e) => setAppDeadline(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            variant={"outlined"}
            label={"Cost"}
            value={cost}
            placeholder={"0"}
            onChange={(e) => setCost(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            variant={"outlined"}
            label={"Location"}
            value={location}
            placeholder={"New York City"}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            variant={"outlined"}
            label={"Link"}
            value={link}
            placeholder={"https://application.nycsyep.com/"}
            onChange={(e) => setLink(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            variant={"outlined"}
            fullwidth
            multiline
            maxRows={10}
            placeholder={
              "Summer Youth Employment Program (SYEP) is the nation’s largest youth employment program, connecting NYC youth between the ages of 14 and 24 with career exploration opportunities and paid work experiences each summer. "
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default OpportunityForm;
