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

function App() {
    return (
        <div className="App">
            <div className="borda">
                {/* <Header /> */}
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
                        path="/confirmar-presenca"
                        element={
                            <PrivateRoute redirectTo="/">
                                <ConfirmarPresenca />
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
                </Routes>
            </div>
        </div>
    );
}

export default App;
