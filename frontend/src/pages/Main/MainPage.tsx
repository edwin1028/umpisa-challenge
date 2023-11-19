import { Box } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../provider/Auth.provider";
import { AuthContextType } from "../../types/authcontext.type";

const MainPage = () => {
    const authContext = useContext<AuthContextType | null>(AuthContext);

    console.log(authContext?.isLoggedIn);

    return authContext?.isLoggedIn !== null ? (
        <Box
            display={"flex"}
            flexDirection={"row"}
            sx={{
                height: "100%",
                width: "100%",
                overflow: "hidden",
            }}
        >
            <Box>Side Nav</Box>
            <Box flex={1} display={"flex"}>
                <Outlet />
            </Box>
        </Box>
    ) : (
        <Outlet />
    );
};

export default MainPage;
