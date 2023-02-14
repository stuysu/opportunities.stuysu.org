import React from "react";
import { Typography, Button, ButtonGroup } from "@mui/material";
import { Helmet } from "react-helmet";
import PeeringThroughHole from "../img/vector/goodstudio-peering-through-hole.svg";
import "../tailwind.css";

const HTTP404 = () => {
  return (
    <div>
      <Helmet>
        <title>404</title>
      </Helmet>
      <main>
        <img
          className={"mx-auto w-1/2 md:w-1/3 lg:w-1/4"}
          src={PeeringThroughHole}
          alt={"404"}
        />
        <Typography
          paragraph
          variant={"h1"}
          className={"text-center text-2xl md:text-3xl lg:text-4xl font-bold"}
        >
          404
        </Typography>
        <Typography
          paragraph
          className={"text-center text-xl md:text-2xl lg:text-3xl"}
        >
          We couldn't find the page you were looking for. It may have been moved
          or deleted. If you think this is an error, please wait a moment and
          try again, or contact us.
        </Typography>
        <div className={"flex justify-center"}>
          <ButtonGroup variant={"contained"} color={"primary"}>
            <Button href={"/"}>Back Home</Button>
          </ButtonGroup>
        </div>
      </main>
    </div>
  );
};

export default HTTP404;
