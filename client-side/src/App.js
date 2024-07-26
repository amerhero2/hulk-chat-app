import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProtectedRoutes from './components/hoc/ProtectedRoutes';
import Header from './components/header/header';
import Dashboard from './pages/dashboard/Dashboard';
import { WebSocketProvider } from './contexts/WebSocketContext';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<WebSocketProvider><Dashboard /></WebSocketProvider>} path="/dashboard" />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;