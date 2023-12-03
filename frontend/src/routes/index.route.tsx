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
import MyEventsPage from "../pages/Main/MyEvents/MyEventsPage";
import EventsPage from "../pages/Main/Events/EventsPage";
import MyTicketsPage from "../pages/Main/MyTickets/MyTicketsPage";
import MyCartPage from "../pages/Main/MyCart/MyCartPage";

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
                                <DashboardPage name="Dashboard" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="events"
                        element={
                            <ProtectedRoute>
                                <EventsPage name="Events" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="my-events"
                        element={
                            <ProtectedRoute>
                                <MyEventsPage name="My Events" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="my-tickets"
                        element={
                            <ProtectedRoute>
                                <MyTicketsPage name="My Tickets" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="my-cart"
                        element={
                            <ProtectedRoute>
                                <MyCartPage name="My Cart" />
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
