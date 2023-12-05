import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../../../provider/Auth.provider";
import { AuthContextType } from "../../../types/authcontext.type";
import {
    APPBAR_HEIGHT,
    APPBAR_HEIGHT_MOBILE,
} from "../../../constants/any.constant";

export default function DashboardPage({ name }: any) {
    const authContext = useContext<AuthContextType | null>(AuthContext);

    React.useEffect(() => {
        authContext?.setPage(name);
    }, []);

    return (
        <Box
            sx={(theme) => ({
                position: "relative",
                overflowY: "auto",
                height: `calc(100% - ${APPBAR_HEIGHT}px)`,
                p: 3,
                [theme.breakpoints.down("sm")]: {
                    height: `calc(100% - ${APPBAR_HEIGHT_MOBILE}px)`,
                },
            })}
        >
            Dashboard works!
        </Box>
    );
}
