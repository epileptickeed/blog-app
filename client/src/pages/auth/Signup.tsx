import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authSelector } from '../../../redux/authSlice/selector';
import { setUserEmail, setUserName, setUserPassword } from '../../../redux/authSlice/auth';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useMutation } from 'react-query';

const Signup = () => {
  const mutation = useMutation(SignUp);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, password } = useSelector(authSelector);

  async function SignUp() {
    try {
      const postData = {
        name,
        email,
        password,
      };

      const { data } = await axios.post('/signup', postData);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('User signed');
        navigate('/login');
      }
    } catch (error) {
      toast.error('something went wrong');
      console.error(error);
    }
  }

  const handleSignUp = () => {
    mutation.mutate();
  };

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

        <button id="submit" onClick={() => handleSignUp()}>
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
