import { Outlet } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './model/db/config/firestoreConfig';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();

const App: React.FunctionComponent = () => {
  return (
    <div className='container-fluid p-0 m-0'>
      <Outlet />
    </div>
  );
};

export default App;
