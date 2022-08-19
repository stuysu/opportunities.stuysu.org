import {
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  ListItemText,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
  MenuItem,
} from "@mui/material";
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

const categories = [
  "Events of Interest",
  "Academic Programs",
  "Business and Jobs",
  "Community Service",
  "Leadership, Government, International",
  "Museums, Art, Design",
  "Parks, Zoo, Nature",
  "Engineering, Math, Computer Science",
  "Medical, Life Sciences",
  "Theater, Music, Writing, Videos",
  "Contests, Competitions",
  "Additional Links and Resources",
  "Scholarships",
];

const eligibilities = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Female Only",
  "Underrepresented Community",
];

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
  const [allCategory, setAllCategory] = React.useState([]);
  const [allEligibility, setAllEligibility] = React.useState([]);
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setAllCategory(value);
    console.log(allCategory);
  };
  const handleEligibilityChange = (event) => {
    const {
      target: { value },
    } = event;
    setAllEligibility(value);
    console.log(allEligibility);
  };

  const [createOpportunity] = useMutation(CREATE_MUTATION);

  return (
    <div>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                variant={"outlined"}
                fullWidth
                label={"Title"}
                value={title}
                placeholder={"Summer Youth Employment Program"}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                variant={"outlined"}
                fullWidth
                label={"Date"}
                value={date}
                placeholder={"June 20 - August 12"}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                variant={"outlined"}
                fullWidth
                label={"Deadline"}
                value={appDeadline}
                placeholder={"2022-05-06"}
                onChange={(e) => setAppDeadline(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                variant={"outlined"}
                fullWidth
                label={"Location"}
                value={location}
                placeholder={"New York City"}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
        <Grid item xs={6} sm={6} md={6} lg={2} xl={2}>
          <Grid style={{ height: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="multiple-categories-label">Categories</InputLabel>
              <Select
                labelId="multiple-categories-label"
                multiple
                value={allCategory}
                onChange={handleCategoryChange}
                input={<OutlinedInput label={"Chip"} />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    <Checkbox checked={allCategory.indexOf(category) > -1} />
                    <ListItemText primary={category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={2} xl={2}>
          <Grid style={{ height: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="multiple-eligibilities-label">
                Eligibilities
              </InputLabel>
              <Select
                labelId="multiple-eligibilities-label"
                multiple
                value={allEligibility}
                onChange={handleEligibilityChange}
                input={<OutlinedInput label={"Chip"} />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {eligibilities.map((eligibility) => (
                  <MenuItem key={eligibility} value={eligibility}>
                    <Checkbox
                      checked={allEligibility.indexOf(eligibility) > -1}
                    />
                    <ListItemText primary={eligibility} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Button
        onClick={() => {
          createOpportunity({
            variables: {
              title,
              description,
              categories: allCategory.map((e) => categories.indexOf(e) + 1),
              eligibilities: allEligibility.map(
                (e) => eligibilities.indexOf(e) + 1
              ),
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
