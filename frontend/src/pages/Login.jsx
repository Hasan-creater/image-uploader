import {useState} from 'react';
import { useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import axios from 'axios';

export default function Login() {
    
    const [formdata,setformData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (e)=> {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formdata);
            login(response.data.token);
            console.log(response.data.token);

            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }
        const handleChange = (e) => {
        setformData({...formdata, [e.target.name]:e.target.value})
    }
    
    
    return (
        <div>
            <h2>Login</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            
        <input type="email" name='email' placeholder="Email" value={formdata.email} onChange={handleChange} />
        <input type="password" name='password' placeholder="Password" value={formdata.password} onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>Login</button>
         <p>
        Don't have an account?{' '}
        <span
          onClick={() => navigate('/register')}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Register here
        </span>
      </p>
        </div>
    )
}