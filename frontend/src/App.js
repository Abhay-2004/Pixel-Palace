//authors: prerak@iastate.edu, abhay14@iastate.edu
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LaptopShop } from "./LaptopShop.js";
import { Cart } from "./CartView.js";
import { ShopContextProvider } from "./shop-context.js";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LaptopShop />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;