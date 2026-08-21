import { Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerCreatePage from "./pages/CustomerCreatePage";
import CustomerEditPage from "./pages/CustomerEditPage";

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="/customers" element={<CustomerListPage />} />
      <Route path="/customers/:id" element={<CustomerDetailPage />} />
      <Route path="/customers/new" element={<CustomerCreatePage />} />
      <Route path="/customers/:id/edit" element={<CustomerEditPage />} />
    </Routes>
  );
}

export default App;
