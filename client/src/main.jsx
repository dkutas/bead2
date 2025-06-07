import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {Provider} from "react-redux";
import {store} from "./features/store/store.js";
import {createTheme, ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router";
import {router} from "./routes.js";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import {SnackBarProvider} from "./contexts/SnackBarContext.jsx";

const theme = createTheme({
    palette: {
        primary: {
            main: "#84CC16"
        }
    }
})


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <SnackBarProvider>
                    <Provider store={store}>
                        <RouterProvider router={router}/>
                    </Provider>
                </SnackBarProvider>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);
