import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  // State variables for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selecting data from Redux store
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Effect to handle success, error, and navigation
  useEffect(() => {
    // Display error message if there's an error
    if (isError) {
      toast.error(message);
    }

    // Redirect to dashboard on successful registration
    if (isSuccess || user) {
      navigate('/');
    }

    // Reset the authentication state
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Function to update form data on input change
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      // Dispatch register action with user data
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  // Render spinner if loading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          {/* Name input */}
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          {/* Email input */}
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          {/* Password input */}
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          {/* Confirm password input */}
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          {/* Submit button */}
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
