import { Button, Grid, Snackbar, TextField } from "@mui/material";
import React from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_MUTATION = gql`
  mutation CreateOpportunity(
    $title: String!
    $description: String!
    $categories: [Int]
    $eligibilities: [Int]
    $date: String
    $location: String
    $cost: Int
    $appDeadline: Date
    $link: String
  ) {
    createOpportunity(
      title: $title
      description: $description
      categories: $categories
      eligibilities: $eligibilities
      date: $date
      location: $location
      cost: $cost
      appDeadline: $appDeadline
      link: $link
    ) {
      id
      title
      description
    }
  }
`;

const OpportunityForm = (opportunity = {}) => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const [title, setTitle] = React.useState(opportunity.title || "");
  const [date, setDate] = React.useState(opportunity.date || "");
  const [appDeadline, setAppDeadline] = React.useState(
    opportunity.appDeadline || ""
  );
  const [cost, setCost] = React.useState(opportunity.cost || "");
  const [location, setLocation] = React.useState(opportunity.location || "");
  const [link, setLink] = React.useState(opportunity.link || "");
  const [description, setDescription] = React.useState(
    opportunity.description || ""
  );

  const [createOpportunity] = useMutation(CREATE_MUTATION);

  return (
    <div>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                variant={"outlined"}
                fullWidth
                label={"Title"}
                value={title}
                placeholder={"Summer Youth Employment Program"}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                variant={"outlined"}
                fullWidth
                label={"Date"}
                value={date}
                placeholder={"June 20 - August 12"}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                variant={"outlined"}
                fullWidth
                label={"Deadline"}
                value={appDeadline}
                placeholder={"2022-05-06"}
                onChange={(e) => setAppDeadline(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                variant={"outlined"}
                fullWidth
                label={"Cost"}
                value={cost}
                placeholder={"0"}
                onChange={(e) => {
                  setCost(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                variant={"outlined"}
                fullWidth
                label={"Location"}
                value={location}
                placeholder={"New York City"}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                variant={"outlined"}
                fullWidth
                label={"Link"}
                value={link}
                placeholder={"https://application.nycsyep.com/"}
                onChange={(e) => setLink(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                variant={"outlined"}
                fullWidth
                multiline
                maxRows={10}
                label={"Description"}
                value={description}
                sx={{ marginBottom: "10px" }}
                placeholder={
                  "Summer Youth Employment Program (SYEP) is the nation’s largest youth employment program, connecting NYC youth between the ages of 14 and 24 with career exploration opportunities and paid work experiences each summer. "
                }
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
          <Grid style={{ height: "100%" }}>
            <TextField
              fullWidth
              label={"Categories"}
              style={{ height: "100%" }}
            />
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
          <Grid style={{ height: "100%" }}>
            <TextField
              fullWidth
              label={"Eligibilities"}
              style={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Button
        onClick={() => {
          createOpportunity({
            variables: {
              title,
              description,
              categories: [],
              eligibilities: [],
              date,
              location,
              cost: parseInt(cost) || 0,
              appDeadline: appDeadline || "2100-01-01",
              link,
            },
          });
          setSnackbarOpen(true);
        }}
        variant="contained"
      >
        Create Opportunity
      </Button>
      <Snackbar
        autoHideDuration={2000}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={"Opportunity Created!"}
      />
    </div>
  );
};

export default OpportunityForm;
