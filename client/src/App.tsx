import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import CategoriesBrands from "./pages/CategoriesBrands";
import Tools from "./pages/Tools";
// import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./lib/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteForLoggedUsers from "./components/ProtectedRouteForLoggedUsers";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
        <AuthProvider>
          <DataProvider>
            <MainLayout>
            <Routes>
              <Route path="/" element={
                <Landing 
                />} />
              <Route path="/login" element={
                <ProtectedRouteForLoggedUsers>
                <Login
                 />
                 </ProtectedRouteForLoggedUsers>
                 } 
                 />
              <Route path="/register" element={
                <ProtectedRouteForLoggedUsers>
                <Register 
                />
                </ProtectedRouteForLoggedUsers>
                } />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/customers"
                element={
                  <ProtectedRoute>
                    <Customers />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <CategoriesBrands />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/tools"
                element={
                  <ProtectedRoute>
                    <Tools />
                  // </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </MainLayout>
          </DataProvider>
        </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
