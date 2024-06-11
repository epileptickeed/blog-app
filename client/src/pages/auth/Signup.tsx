import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authSelector } from '../../../redux/authSlice/selector';
import { setUserEmail, setUserName, setUserPassword } from '../../../redux/authSlice/auth';
import { useMutation } from 'react-query';
import SignUp from '../../../utils/SignUp';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, email, password } = useSelector(authSelector);

  const { mutate } = useMutation(() => SignUp(name, email, password), {
    onSuccess: () => {
      toast.success('Signed Up');
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.error}`);
    },
  });

  return (
    <div className="signup">
      <h2>Signup</h2>
      <div className="signup_inner">
        <br />
        <label htmlFor="name">NickName:</label>
        <input
          type="text"
          placeholder="Terry Davis or mr.Devis"
          id="name"
          required
          value={name}
          onChange={(e) => dispatch(setUserName(e.target.value))}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          placeholder="qwerty@gmail.com"
          id="email"
          required
          value={email}
          onChange={(e) => dispatch(setUserEmail(e.target.value))}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="*******"
          id="password"
          required
          value={password}
          onChange={(e) => dispatch(setUserPassword(e.target.value))}
        />

        <button id="submit" onClick={() => mutate()}>
          Signup
        </button>
      </div>
      <span>
        Have an account already? <Link to="/login">Log in</Link>
      </span>
    </div>
  );
};

export default Signup;
