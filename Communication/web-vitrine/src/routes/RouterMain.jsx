import { ThemeProvider } from "@emotion/react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Navbar from "./Navbar";
import Team from "../components/Team";
import Home from "../components/Home";
import theme from "../theme";

export default function RouterMain() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<Home />} />
                        <Route path="/team" element={<Team />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}