import React, {useState, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import '../components/bootstrap.min.css'
import '../components/style.css'


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        // Remove non-numeric characters and limit to 14 digits
        const newValue = event.target.value.replace(/[^0-9]/g, '').slice(0, 14);
        setUsername(newValue)
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(username, password);

    };
    let { loginUser } = useContext(AuthContext)

    return (
        <div className=' d-flex   align-content-center loginCont'>
            <div className='loginArea col-12 '>
            <div className='row'>
            
            <div className='col-12 loginDiv'>
            <h3 className='org mb-4 mt-2'>Login</h3>
            <form onSubmit={handleSubmit} className='form-horizontal'>
                <label className='font-weight-light d-block ' htmlFor="username">National ID</label>

                <input className="form-control d-block font-weight-light text-right border border-1 border-opacity-75 border-black" 
                    type="text" 
                    name="username" 
                    id='username' 
                    maxLength={14}
                    value={username}
                    onChange={handleChange}
                    placeholder="Enter National ID" />
                
                <label className='font-weight-light d-block mt-4' htmlFor="password">password</label>
                <input className="form-control d-block font-weight-light text-right border border-1 border-opacity-75 border-black" 
                type="password" 
                name="password" 
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" />
                
                <div className='row'>
                <div className="col-12 text-center">
                <input type="submit" value="Login" className="btn loginButton mt-3 mb-3 "/>
                 </div>

                </div>
            </form>
            </div>
        </div>
        </div>
        </div>
    )
}

export default LoginPage