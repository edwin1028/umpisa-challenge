import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import MainPage from "../pages/Main/MainPage";
import ErrorPage from "../pages/Main/Error/ErrorPage";
import LoginPage from "../pages/Landing/Login/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthLayout } from "../provider/AuthLayout";
import DashboardPage from "../pages/Main/Dashboard/DashboardPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<AuthLayout />}>
                <Route path="/" element={<MainPage />}>
                    <Route
                        index
                        path=""
                        element={<Navigate to={"dashboard"} />}
                    />
                    <Route
                        path="dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </>
    )
);
export default router;
