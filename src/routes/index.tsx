import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import BaseLayout from "../layouts/base-layout";
import AuthLayout from "../layouts/auth-layout";
import ProtectedLayout from "../layouts/protected-layout";
import DashboardLayout from "../layouts/dashboard-layout";
import VerifyLayout from "../layouts/verify-layout";

import HomePage from "../pages/home-page";
import NotFoundPage from "../pages/not-found-page";

import SignUpPage from "../pages/auth/sign-up-page";
import SignInPage from "../pages/auth/sign-in-page";
import CreatePasswordPage from "../pages/auth/create-password-page";
import EmailVerificationPage from "../pages/auth/email-verification-page";

import DashboardHomePage from "../pages/dashboard/home";
import DashboardSheetPage from "../pages/dashboard/sheet";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route element={<VerifyLayout />}>
        <Route element={<ProtectedLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<DashboardHomePage />} />
          <Route path="sheet" element={<DashboardSheetPage />} />
        </Route>
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="create-password" element={<CreatePasswordPage />} />
        <Route path="email-verification" element={<EmailVerificationPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default Router;
