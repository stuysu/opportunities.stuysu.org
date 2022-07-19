import React from "react";
import Typography from "@mui/material/Typography";
import {Helmet} from "react-helmet";

const Catalog = () => {
    return (
        <div>
            <Helmet>
                <title>Catalog</title>
            </Helmet>
            <main>
                <Typography paragraph>
                    Catalog page
                </Typography>
            </main>
        </div>
    )
}

export default Catalog;