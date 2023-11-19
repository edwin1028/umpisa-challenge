import { useOutlet } from "react-router-dom";
import { AuthProvider } from "./Auth.provider";

export const AuthLayout = () => {
    const outlet = useOutlet();

    return <AuthProvider>{outlet}</AuthProvider>;
};
