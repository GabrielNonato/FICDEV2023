import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Salas } from './pages/Salas'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Reservas } from './pages/Reservas'
import { Home } from './pages/Home'
import { Perfil } from './pages/Perfil'

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
                    path="/home"
                    element={(
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    )}
                /> 
                <Route
                    path="/perfil"
                    element={(
                        <PrivateRoute>
                            <Perfil />
                        </PrivateRoute>
                    )}
                /> 
               <Route
                    path="/sala"
                    element={(
                        <PrivateRoute>
                            <Salas />
                        </PrivateRoute>
                    )}
                /> 
                <Route
                    path="/reserva"
                    element={(
                        <PrivateRoute>
                            <Reservas />
                        </PrivateRoute>
                    )}
                /> 
            </Routes>
        </BrowserRouter>
    )
}