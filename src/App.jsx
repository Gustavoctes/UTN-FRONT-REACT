import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Proveedores from './pages/Proveedores';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<div className="container mt-5"><h2>Página de Login</h2></div>} />

                <Route element={<ProtectedRoute />}>
                    {/* Todas las rutas aquí dentro requieren autenticación */}
                    <Route path="/proveedores" element={<Proveedores />} />
                </Route>

                <Route path="*" element={<Navigate to="/proveedores" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;