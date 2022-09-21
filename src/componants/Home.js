import React from "react";
import "./Home.css";
import CSM from "./images/csmLarge.png";
import Accordion from "./Accordion";

const Home = () => {
  return (
    <div className="background-color">
      <br></br>
      <br></br>
      <h1>King Operating Corporation</h1>
      <br></br>
      <h2>Different Modules:</h2>
      <br></br>
      <div className="accordion">
        <Accordion />
      </div>
    </div>
  );
};

export default Home;
