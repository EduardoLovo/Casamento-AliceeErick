import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginRegister } from './pages/LoginRegister/LoginRegister';
import PrivateRoute from './components/PrivateRoute';
import { Home } from './pages/Home/Home';
import { ConfirmarPresenca } from './pages/ConfirmarPresenca/ConfirmarPresenca';
import { Checkout } from './pages/Checkout/Checkout';
import { Admin } from './pages/Admin/Admin';
import { ListAllConfirmeds } from './components/Admin/listAllConfimeds';
import { Carrinho } from './pages/Carrinho/Carrinho';
import { Loja } from './components/Loja/Loja';
import { Header } from './components/Header/Header';
import { Cerimonia } from './pages/Cerimonia/Cerimonia';
import { ManualDoConvidado } from './pages/ManualDoConvidado/ManualDoConvidado';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="borda">
                <Routes>
                    <Route path="/" element={<LoginRegister />} />
                    <Route
                        path="/lista-de-confirmados"
                        element={<ListAllConfirmeds />}
                    />
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute redirectTo="/">
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/cerimonia"
                        element={
                            <PrivateRoute redirectTo="/">
                                <Cerimonia />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/confirmar-presenca"
                        element={
                            <PrivateRoute redirectTo="/">
                                <ConfirmarPresenca />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/lista-de-presentes"
                        element={
                            <PrivateRoute redirectTo="/">
                                <Loja />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <PrivateRoute redirectTo="/">
                                <Checkout />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute redirectTo="/">
                                <Admin />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/carrinho"
                        element={
                            <PrivateRoute redirectTo="/">
                                <Carrinho />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/manual-do-convidado"
                        element={
                            <PrivateRoute redirectTo="/">
                                <ManualDoConvidado />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
