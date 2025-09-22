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
import AuditObservationIssueRisk from "./layouts/AuditObservationIssueRisk";
// import AuditObservationCheck from "./layouts/AuditObservationCheck";
import ContarctImportForm from "./layouts/ContarctImportForm";
import MSAList from "./layouts/MsaList";
import MSAAddEdit from "./layouts/MsaAddEdit";
import MSAImportForm from "./layouts/MsaImportForm";
import CRList from "./layouts/CrList";
import CRAddEdit from "./layouts/CrAddEdit";
import CRImportForm from "./layouts/CrImportForm";

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
          {/* Obligation Module Route */}
          <Route path="/obligations" element={<Obligations />} />
          <Route path="/obligationView/:id" element={<ObligationView />} />
          
          {/* Contract Module Route */}
          <Route path="/contracts" element={<ContractList />} />
          <Route path="/contract/add" element={<ContractAddEdit />} />
          <Route path="/contract/edit/:id" element={<ContractAddEdit />} />
          <Route path="/contractform/import" element={<ContarctImportForm />} />

          <Route path="/auditplan" element={<AuditPlan />} />
          <Route path="/auditplan/edit/:id" element={<AuditPlanAddEdit />} />
          <Route path='/auditobservation' element={<AuditObservation />} /> 
          <Route path="/auditobservation/edit/:id" element={<AuditObservationAddEdit />} />
          <Route path='/auditObservation-issue' element={<AuditObservationIssueRisk />} /> 

          {/* MSA Module Route */}
          <Route path="/msa/list" element={<MSAList />} />
          <Route path="/msa/add" element={<MSAAddEdit />} />
          <Route path="/msa/edit/:id" element={<MSAAddEdit />} />
          <Route path="/msaform/import" element={<MSAImportForm />} />

          {/* CR Module Route */}
          <Route path="/cr/list" element={<CRList />} />
          <Route path="/cr/add" element={<CRAddEdit />} />
          <Route path="/cr/edit/:id" element={<CRAddEdit />} />
          <Route path="/crform/import" element={<CRImportForm />} />



        </Route>
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
