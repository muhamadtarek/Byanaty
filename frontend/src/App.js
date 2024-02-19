import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import BirthCertificateForm from './pages/BirthCertificateForm';
import NationalIDForm from './pages/NationalIDForm';
import MilitaryStatusForm from './pages/MilitaryStatusForm';
import Header from './components/Header'

import PrivateRoute from './utils/PrivateRoute'


function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                <Header/>
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute>                        
                            <HomePage/>
                        </PrivateRoute>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/birthcertform" element={<PrivateRoute> <BirthCertificateForm /></PrivateRoute>} />
                    <Route path="/nationalidform" element={<PrivateRoute><NationalIDForm /></PrivateRoute>} />
                    <Route path="/militarystatusform" element={<PrivateRoute><MilitaryStatusForm /></PrivateRoute>} />
                </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;