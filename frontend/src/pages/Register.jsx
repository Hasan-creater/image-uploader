import {useState} from 'react';
import { useNavigate} from "react-router-dom";
import axios from 'axios';
 

export default function Register() {
  const [formData , setformData] = useState({
    name: '',
    email: '',
    password: ''


})      
const [error, setError] = useState('');

        const navigate = useNavigate();
        const handleSubmit = async (e) => {
         e.preventDefault();
       
 
   
  

    try {
        await axios.post('http://localhost:5000/api/auth/register', formData);
        navigate('/login');
    } catch (error) {
        setError('Error registering user');
    } 
}
const handleChange = (e) => {
        setformData({...formData, [e.target.name]:e.target.value})
    }
        
    
return (
    <div>
        <h2>Register</h2>
    {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="text" name='name' placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name='email' placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name='password' placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>Register
          
        </button>
           <p>
        Don't have an account?{' '}
        <span
          onClick={() => navigate('/Login')}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Login Here
        </span>
      </p>
    </div>
)
}