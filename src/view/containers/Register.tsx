import { Formik } from 'formik';
import RegisterForm from '../components/Register/RegisterForm';
import handleRegister from '../../controller/handlers/register';
import { VALIDATE_REGISTER } from '../../model/validations';
import { NewUser } from '../../types';

const INITIAL_VALUES: NewUser = {
  firstname: '',
  lastname: '',
  email: '',
  cel: '',
  password: '',
  description: '',
  profileImg: '',
};

const Register: React.FunctionComponent = (props) => {
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATE_REGISTER}
      onSubmit={async (values, actions) => {
        await handleRegister(values, actions);
      }}
    >
      <main
        className='d-flex align-items-center justify-content-center'
        style={{
          minHeight: '100vh',
          backgroundColor: '#d1e4bc',
        }}
      >
        <RegisterForm />
      </main>
    </Formik>
  );
};

export default Register;
