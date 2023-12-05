import { RouterProvider } from "react-router-dom";
import router from "./routes/index.route";
import { Provider } from "react-redux";
import reduxStore from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
    const { store, persistor } = reduxStore();

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    );
};

export default App;
