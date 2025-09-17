import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./layouts/Login";
import Obligations from "./layouts/Obligations";
import ObligationView from "./layouts/ObligationsView";
import "./index.css";
import ContractList from "./layouts/Contract";
import ContractAddEdit from "./layouts/ContractAddEdit";
import TwoStepVerification from "./layouts/TwoStepVerification";
import { SnackbarProvider } from "./utils/snackbar";
import AuditPlan from "./layouts/AuditPlan";
import AuditPlanAddEdit from "./layouts/AuditPlanAddEdit";
import AuditObservation from "./layouts/AuditObservation";
import AuditObservationAddEdit from "./layouts/AuditObservationAddEdit";
import AuditObservationCheck from "./layouts/AuditObservationCheck";
import ContarctImportForm from "./layouts/ContarctImportForm";

function App() {
  return (
    <SnackbarProvider>
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
          <Route path="/obligationView/:id" element={<ObligationView />} />
          <Route path="/contracts" element={<ContractList />} />
          <Route path="/contract/add" element={<ContractAddEdit />} />
          <Route path="/contract/edit/:id" element={<ContractAddEdit />} />
          <Route path="/contractform/import" element={<ContarctImportForm />} />
          <Route path="/auditplan" element={<AuditPlan />} />
          <Route path="/auditplan/edit/:id" element={<AuditPlanAddEdit />} />
          <Route path='/auditobservation' element={<AuditObservation />} /> 
          <Route path="/auditobservation/edit/:id" element={<AuditObservationCheck />} />
          <Route path='/issue' element={<AuditObservationAddEdit />} /> 



        </Route>
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
