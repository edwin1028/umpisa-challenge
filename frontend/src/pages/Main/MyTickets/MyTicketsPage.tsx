import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../../../provider/Auth.provider";
import { AuthContextType } from "../../../types/authcontext.type";
import {
    APPBAR_HEIGHT,
    APPBAR_HEIGHT_MOBILE,
} from "../../../constants/any.constant";

export default function MyTicketsPage({ name }: any) {
    const authContext = useContext<AuthContextType | null>(AuthContext);

    React.useEffect(() => {
        authContext?.setPage(name);
    }, []);

    return (
        <>
            <Box
                sx={(theme) => ({
                    position: "relative",
                    overflowY: "auto",
                    overflowX: "hidden",
                    p: 3,
                    height: `calc(100% - ${APPBAR_HEIGHT}px)`,
                    [theme.breakpoints.down("sm")]: {
                        height: `calc(100% - ${APPBAR_HEIGHT_MOBILE}px)`,
                    },
                })}
            >
                <Typography paragraph>My Tickets page works!</Typography>
            </Box>
        </>
    );
}
