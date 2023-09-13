import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Sala } from './pages/Sala'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
//import { Foods } from "./pages/Foods";
import { isAuthenticated } from './utils/is-authenticated';

export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/"
                    element={
                        <Login />
                    }
                />
                <Route path="/register"
                    element={
                        <Register />
                    }
                />
               <Route
                    path="/sala"
                    element={(
                        <PrivateRoute>
                            <Sala />
                        </PrivateRoute>
                    )}
                /> 
            </Routes>
        </BrowserRouter>
    )
}