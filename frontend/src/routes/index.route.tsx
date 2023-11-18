import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/Main/MainPage";
import ErrorPage from "../pages/Main/Error/ErrorPage";
import LoginPage from "../pages/Landing/Login/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: "Sample 1",
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

export default router;
