import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../../../provider/Auth.provider";
import { AuthContextType } from "../../../types/authcontext.type";

export default function MyTicketsPage({ name }: any) {
    const authContext = useContext<AuthContextType | null>(AuthContext);

    React.useEffect(() => {
        authContext?.setPage(name);
    }, []);
    
    return (
        <>
            <Typography paragraph>My Tickets Page</Typography>
        </>
    );
}
