import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const {token, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }


  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: 'white'
    }}>

      
      <span
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', fontSize: '22px', fontWeight: 'bold' }}
      >
        Pic ERS
      </span>

      
      <div style={{ display: 'flex', gap: '10px' }}>

        {!token ? (

          <>
           
            <button onClick={() => navigate('/login')}>
              Login
            </button>
            <button onClick={() => navigate('/register')}>
              Register
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/dashboard')}>
              Dashboard
            </button>
            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  )
}