import { useOutlet } from "react-router-dom";
import { AuthProvider } from "./Auth.provider";
import { Box } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

export const AuthLayout = () => {
    const outlet = useOutlet();

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ height: "100%" }}>
                <AuthProvider>{outlet}</AuthProvider>
            </Box>
        </LocalizationProvider>
    );
};
