import { RouterProvider } from "react-router-dom";
import router from "./routes/index.route";

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
