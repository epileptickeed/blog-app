import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authSelector } from '../../../redux/authSlice/selector';
import { setUserEmail, setUserPassword } from '../../../redux/authSlice/auth';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = useSelector(authSelector);

  const handleLogin = async () => {
    try {
      const postData = {
        email,
        password,
      };

      const { data } = await axios.post('/login', postData);

      if (data.error) {
        toast.error('hello');
        console.log('hello');
      } else {
        toast.success('Success');
        // navigate('/')
      }
    } catch (error) {
      toast.error('error');
      console.error(error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <div className="signup_inner">
        <input
          type="text"
          placeholder="qwerty@gmail.com"
          value={email}
          onChange={(e) => dispatch(setUserEmail(e.target.value))}
        />
        <input
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => dispatch(setUserPassword(e.target.value))}
        />
        <button id="submit" onClick={() => handleLogin()}>
          Login
        </button>
      </div>
      <span>
        Dont have an account? <Link to="/signup">sign up</Link>
      </span>
    </div>
  );
};

export default Login;
