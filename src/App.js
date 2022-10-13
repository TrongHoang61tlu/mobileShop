import "./App.css";
import {BrowserRouter, Routes,Route} from "react-router-dom";

import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Slider from "./shared/components/Layout/Slider";
import Sidebar from "./shared/components/Layout/Sidebar";
import Footer from "./shared/components/Layout/Footer";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Success from "./pages/Success";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          {/*	Body	*/}
          <div id="body">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <Menu />
                </div>
              </div>
              <div className="row">
                <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                  <Slider />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Category" element={<Category />} />
                    <Route
                      path="/ProductDetails"
                      element={<ProductDetails />}
                    />
                    <Route path="/Search" element={<Search />} />
                    <Route path="/Cart" element={<Cart />} />
                    <Route path="/Success" element={<Success />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Sidebar />
              </div>
            </div>
          </div>
          {/*	End Body	*/}
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
