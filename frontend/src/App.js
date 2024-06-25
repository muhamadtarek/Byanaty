import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import BirthCertificateForm from './pages/BirthCertificateForm';
import NationalIDForm from './pages/NationalIDForm';
import MilitaryStatusForm from './pages/MilitaryStatusForm';
import MarriageForm from './pages/MarriageForm';
import DivorceForm from './pages/DivorceForm';
import DeathForm from './pages/DeathForm';
import Header from './components/Header';
import DashboardWrapper from './components/Dashboard/DashboardWrapper'

import PrivateRoute from './utils/PrivateRoute'
import ValidationWrapper from './components/Validation/ValidationWrapper';
import Payment from './components/Payment/Payment';



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
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/birthcertificationform" element={<PrivateRoute> <BirthCertificateForm /></PrivateRoute>} />
                    <Route path="/nationalidform" element={<PrivateRoute><NationalIDForm /></PrivateRoute>} />
                    <Route path="/militarystatusform" element={<PrivateRoute><MilitaryStatusForm /></PrivateRoute>} />
                    <Route path="/marriageform" element={<PrivateRoute> <MarriageForm /></PrivateRoute>} />
                    <Route path="/divorceform" element={<PrivateRoute><DivorceForm /></PrivateRoute>} />
                    <Route path="/deathform" element={<PrivateRoute><DeathForm /></PrivateRoute>} />
                    <Route path="/dashboard" element={<PrivateRoute><DashboardWrapper /></PrivateRoute>} />
                    <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
                    <Route path="/validation" element={<ValidationWrapper />} />
                </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;