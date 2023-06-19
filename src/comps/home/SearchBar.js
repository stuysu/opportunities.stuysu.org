import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <TextField
      fullWidth
      id="fullWidth"
      label="Search for opportunities... (Supports basic regex)"
      color="secondary"
      autoFocus={true}
      onChange={(event) => setSearch(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") navigate(`/catalog?q=${search}`);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => navigate(`/catalog?q=${search}`)}
              aria-label={"search"}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
