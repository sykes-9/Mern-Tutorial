import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  // Hook to navigate between routes
  const navigate = useNavigate();
  
  // Redux hooks to access and dispatch actions
  const dispatch = useDispatch();
  
  // Selecting user state from Redux store
  const { user } = useSelector((state) => state.auth);

  // Function to handle user logout
  const onLogout = () => {
    // Dispatching logout action
    dispatch(logout());
    // Dispatching reset action to clear any error messages
    dispatch(reset());
    // Navigating back to home page after logout
    navigate('/');
  };

  // Rendering the header section with logo and navigation links
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? ( // If user is logged in
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : ( // If user is not logged in
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
