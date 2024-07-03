import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import {
  Dashboard,
  PageNotFound,
  ProductPage,
  OrderPage,
  SettingPage,
  UserPage,
} from "./screens";
import LoginPage from "./pages/login/LoginPage";
import SignUp from "./pages/register/RegisterPage";
import PaymentPage from "./pages/payment/PaymentPage";
import StatisticsPage from "./pages/statistics/StatisticsPage";
import Customer from "./pages/customer/CustomerPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<BaseLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
