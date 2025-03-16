import Register from './Components/Register';
import Login from './Components/Login';
import Layout from './Components/Layout';
import Missing from './Components/Missing';
import Unauthorized from './Components/Unauthorized';
import Loan from "./Components/Loan"
import RequireAuth from './Components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
       
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Loan />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;