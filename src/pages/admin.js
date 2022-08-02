import React from "react";
import Typography from "@mui/material/Typography";
import {Helmet} from "react-helmet";

const Admin = () => {
    return (
        <div>
            <Helmet>
                <title>Admin</title>
            </Helmet>
            <main>
                <Typography paragraph>
                    Admin page
                </Typography>
            </main>
        </div>
    )
}

export default Admin;