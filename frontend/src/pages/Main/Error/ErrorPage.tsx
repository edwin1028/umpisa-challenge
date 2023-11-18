import { Box } from "@mui/material";

const ErrorPage = () => {
    return (
        <Box
            position={"relative"}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
                height: "100%",
                width: "100%",
            }}
        >
            <h1>404 | Page not found</h1>
        </Box>
    );
};

export default ErrorPage;
