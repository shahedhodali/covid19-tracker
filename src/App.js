import React from "react";
import "./css/style.css";
import Header from "./components/header";
import Cards from "./components/Cards/Cards";

const App = () => {
  return (
    <div className='container'>
    <Header />
    <Cards />
    </div>
  );
}

export default App;