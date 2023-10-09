import "antd/dist/antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ItemPage from "./Pages/ItemPage"
import CartPage from "./Pages/CartPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" 
          element={
         <ProtectedRoute>
           <HomePage />
         </ProtectedRoute>
          } />
          <Route path="/items"
            element={
              <ProtectedRoute>
                 <ItemPage />
              </ProtectedRoute>
           
            } />
          <Route path="/cart" 
          element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
          }/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute({children}){
  if(localStorage.getItem('auth')){
    return children;
  }else{
    return <Navigate to='/login' />;
  }
}