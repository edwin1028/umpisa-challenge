import { Button, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import router from "./routes/index.route";
import { AuthProvider } from "./provider/Auth.provider";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};

export default App;
