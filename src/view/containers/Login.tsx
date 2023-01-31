import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import { Formik } from 'formik';
import { VALIDATE_LOGIN } from '../../model/validations';
import { Auth } from '../../types';
import handleLogin from '../../controller/handlers/login';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../controller/features';

const INITIAL_VALUES: Auth = {
  email: '',
  password: '',
};

const Login: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <main
      className='d-flex flex-column gap-4 align-items-center justify-content-center'
      style={{
        minHeight: '100vh',
        backgroundColor: '#d1e4bc',
      }}
    >
      <h1 className=''>LOGIN</h1>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATE_LOGIN}
        onSubmit={async (values) => {
          const currentUser = await handleLogin(values);
          if (currentUser) {
            dispatch(setCurrentUser(currentUser));
            navigate('/home');
          }
        }}
      >
        <LoginForm />
      </Formik>
      <Link to='/register'>Regístrate gratis</Link>
    </main>
  );
};

export default Login;
