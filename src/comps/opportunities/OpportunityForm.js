import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  ListItemText,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import moment from "moment";

const QUERY = gql`
  query {
    categories {
      name
    }
    eligibilities {
      name
    }
  }
`;

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

const EDIT_MUTATION = gql`
  mutation EditOpportunity(
    $id: Int!
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
    editOpportunity(
      id: $id
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

const DatePickerErrorMessage = (error) => {
  /**
   * Creates the OpportunityForm used on the admin page.
   * @function
   * @param {string|null} error - Error code, refer to the {@link https://next.material-ui-pickers.dev/api/DatePicker DatePicker documentation}
   */
  switch (error) {
    case "invalidDate":
      return "Deadline date is not in the correct format. (MM/DD/YYYY)";
    case "minDate":
      return "Deadline date is too far in the past."; // the limit is January 1, 1900
    case "maxDate":
      return "Deadline date is too far in the future."; // the limit is December 31, 2099
    case null:
      return false;
    default: // catch-all for the ones that shouldn't show up
      return `Deadline date has unknown error. Error Code: ${error}`;
  }
};

const OpportunityForm = (opportunity = {}) => {
  /**
   * Creates the OpportunityForm used on the admin page.
   * @constructor
   * @param {Object} opportunity - React properties, customarily referred to as "props" (described below)
   * @property {number} id - ID of the opportunity being operated on (if there's an id, opportunity is now edited instead of created)
   * @property {string} title - Title data of the opportunity being operated on
   * @property {string} description - Description of the opportunity
   * @property {string} date - Date of the opportunity in an arbitrary string
   * @property {string} appDeadline - Deadline of the app, non-flexible string in YYYY-MM-DD format for DB/sorting
   * @property {string} cost - Cost of the opportunity in an arbitrary string
   * @property {string} link - Link of the opportunity in an arbitrary string
   * @property {[ string ]} categories - Array of category names that the opportunity belongs to
   * @property {[ string ]} eligibilities - Array of eligibility names that the opportunity belongs to
   */
  const [snackbarOpen, setSnackbarOpen] = React.useState("");

  const [id, setId] = React.useState(opportunity.id);
  const [title, setTitle] = React.useState(opportunity.title || "");
  const [date, setDate] = React.useState(opportunity.date || "");
  const [appDeadline, setAppDeadline] = React.useState(
    (opportunity.appDeadline && moment.utc(opportunity.appDeadline)) || null
  );
  const [cost, setCost] = React.useState(opportunity.cost || "");
  const [location, setLocation] = React.useState(opportunity.location || "");
  const [link, setLink] = React.useState(opportunity.link || "");
  const [description, setDescription] = React.useState(
    opportunity.description || ""
  );
  const [categories, setCategories] = React.useState(
    opportunity.categories || []
  );
  const [eligibilities, setEligibilities] = React.useState(
    opportunity.eligibilities || []
  );
  console.log(opportunity.categories);
  console.log(opportunity.eligibilities);

  const [deadlineError, setDeadlineError] = React.useState(false);

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(value);
    console.log(categories);
  };
  const handleEligibilityChange = (event) => {
    const {
      target: { value },
    } = event;
    setEligibilities(value);
    console.log(eligibilities);
  };

  const resetForm = () => {
    // reset form state
    setId(undefined);
    setTitle("");
    setDate("");
    setAppDeadline(null);
    setCost("");
    setLocation("");
    setLink("");
    setDescription("");
    setCategories([]);
    setEligibilities([]);
    // deadlineError is guaranteed to be false by here
  };

  const [createOpportunity] = useMutation(CREATE_MUTATION, {
    onCompleted(data) {
      setSnackbarOpen(`Opportunity #${data.createOpportunity.id} Created!`);
      resetForm();
    },
    onError(error) {
      setSnackbarOpen(error.message);
    },
  });

  const [editOpportunity] = useMutation(EDIT_MUTATION, {
    onCompleted(data) {
      setSnackbarOpen(`Opportunity #${data.editOpportunity.id} Edited!`);
      resetForm();
    },
    onError(error) {
      setSnackbarOpen(error.message);
    },
  });

  // Get array of eligibility and category names
  const { data, loading, error } = useQuery(QUERY);
  if (loading) return <CircularProgress />;
  if (error) return <p>Error :(</p>;
  const allCategories = data?.categories?.map((a) => a.name);
  const allEligibilities = data?.eligibilities?.map((a) => a.name);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  autoFocus={true}
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
                <DatePicker
                  variant={"outlined"}
                  fullWidth
                  label={"Deadline"}
                  onChange={(e) => {
                    setAppDeadline(e);
                  }}
                  onError={(e) => setDeadlineError(DatePickerErrorMessage(e))}
                  value={appDeadline}
                  renderInput={(params) => (
                    // managing the error state directly in the DatePicker is bugged, moved down here
                    <TextField
                      error={deadlineError}
                      helperText={deadlineError}
                      {...params}
                    />
                  )}
                />
                <br />
                <Typography variant={"p"} sx={{ fontSize: "0.6rem" }}>
                  Note: All deadlines are interpreted as 23:59:59 Eastern Time
                  of the provided date. Opportunities will be archived
                  automatically once this time has passed give-or-take a few
                  minutes.
                </Typography>
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
                <InputLabel id="multiple-categories-label">
                  Categories
                </InputLabel>
                <Select
                  labelId="multiple-categories-label"
                  multiple
                  value={categories}
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
                  {allCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      <Checkbox checked={categories.indexOf(category) > -1} />
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
                  value={eligibilities}
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
                  {allEligibilities.map((eligibility) => (
                    <MenuItem key={eligibility} value={eligibility}>
                      <Checkbox
                        checked={eligibilities.indexOf(eligibility) > -1}
                      />
                      <ListItemText primary={eligibility} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </LocalizationProvider>
      <Button
        onClick={async () => {
          if (deadlineError) {
            setSnackbarOpen("Error: " + deadlineError);
            return;
          }

          if (id) {
            await editOpportunity({
              variables: {
                id: id,
                title,
                description,
                categories: categories.map((e) => allCategories.indexOf(e) + 1),
                eligibilities: eligibilities.map(
                  (e) => allEligibilities.indexOf(e) + 1
                ),
                date,
                location,
                cost: parseInt(cost) || 0,
                appDeadline:
                  (appDeadline && appDeadline.format("YYYY-MM-DD")) ||
                  "1970-01-01",
                link,
              },
            });
          } else {
            await createOpportunity({
              variables: {
                title,
                description,
                categories: categories.map((e) => allCategories.indexOf(e) + 1),
                eligibilities: eligibilities.map(
                  (e) => allEligibilities.indexOf(e) + 1
                ),
                date,
                location,
                cost: parseInt(cost) || 0,
                appDeadline:
                  (appDeadline && appDeadline.format("YYYY-MM-DD")) ||
                  "1970-01-01",
                link,
              },
            });
          }
        }}
        variant="contained"
      >
        {id ? "Edit Opportunity" : "Create Opportunity"}
      </Button>
      <Snackbar
        autoHideDuration={2000}
        open={snackbarOpen.length > 0}
        onClose={() => setSnackbarOpen("")}
        message={snackbarOpen}
      />
    </div>
  );
};

export default OpportunityForm;
