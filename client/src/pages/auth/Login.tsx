import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authSelector } from '../../../redux/authSlice/selector';
import { setUserEmail, setUserPassword } from '../../../redux/authSlice/auth';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import LoginUser from '../../../utils/Login';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = useSelector(authSelector);

  const { mutate } = useMutation(() => LoginUser(email, password), {
    onSuccess: () => {
      toast.success('Logged In');
      navigate('/');
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.error}`);
    },
  });

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
        <button id="submit" onClick={() => mutate()}>
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
