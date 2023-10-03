import "antd/dist/antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ItemPage from "./Pages/ItemPage"
import CartPage from "./Pages/CartPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;