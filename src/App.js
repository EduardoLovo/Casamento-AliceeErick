import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginRegister } from './pages/LoginRegister/LoginRegister';
import PrivateRoute from './components/PrivateRoute';
import { Home } from './pages/Home/Home';
import { Header } from './components/Header/Header';
import { ConfirmarPresenca } from './pages/ConfirmarPresenca/ConfirmarPresenca';
import { Checkout } from './pages/Checkout/Checkout';
import { Admin } from './pages/Admin/Admin';

function App() {
    return (
        <div className="App">
            <div className="borda">
                {/* <Header /> */}
                <Routes>
                    <Route path="/" element={<LoginRegister />} />
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/confirmar-presenca"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <ConfirmarPresenca />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Checkout />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Admin />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
