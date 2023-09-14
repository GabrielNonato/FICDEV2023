import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Salas } from './pages/Salas'
import { Register } from './pages/Register'
import { Login } from './pages/Login'

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
                            <Salas />
                        </PrivateRoute>
                    )}
                /> 
            </Routes>
        </BrowserRouter>
    )
}