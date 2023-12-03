import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../../../provider/Auth.provider";
import { AuthContextType } from "../../../types/authcontext.type";

export default function EventsPage({ name }: any) {
    const authContext = useContext<AuthContextType | null>(AuthContext);

    React.useEffect(() => {
        authContext?.setPage(name);
    }, []);

    return (
        <>
            <Typography paragraph>Events Page</Typography>
        </>
    );
}
