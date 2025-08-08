
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./layouts/Login";
import Obligations from "./layouts/Obligations";
import ObligationView from "./layouts/ObligationsView";
import './index.css';
import TEST from "./layouts/test";
import ContractList from "./layouts/Contract";
import ContractAddEdit from "./layouts/ContractAddEdit";
import TwoStepVerification from "./layouts/TwoStepVerification";
function App() {

  return (
    <Routes>
      {/* Auth Routes - no navbar */}
      {/* <Route element={<AuthLayout />}> */}
        <Route path="/" element={<Login />} />
        <Route path="/twostepVerification" element={<TwoStepVerification />} />
        {/* <Route path="/test" element={<TEST />} /> */}

      {/* </Route> */}

      {/* Main App Routes - with navbar */}
      <Route element={<MainLayout />}>
        <Route path="/obligations" element={<Obligations />} />
        <Route path="/obligationView/:id" element={<ObligationView/>} />
        <Route path="/contracts" element={<ContractList />} />
        <Route path="/contract/add" element={<ContractAddEdit />} />
        <Route path="/contract/edit/:id" element={<ContractAddEdit />} />
      </Route>
    </Routes>
  )
}

export default App
