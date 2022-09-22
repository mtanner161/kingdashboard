import React from "react";
import "./Home.css";
import Accordion from "./Accordion";
import IconLogo from "./images/kocLogoRaw.png";

const Home = () => {
  return (
    <div className="background-color">
      <br></br>
      <img src={IconLogo} width="750" height="250"></img>
      <br></br>
      <br></br>
      <h3>
        Development Web Application desgined to help centralize and deploy key
        finance, operations and client relations applications and reports. IN
        DEVELOPMENT - Please contact Michael Tanner (mtanner@kingoperating.com /
        303-907-6825) with any questions
      </h3>
      <br></br>
      <h2>Different Modules:</h2>
      <div className="accordion">
        <Accordion />
      </div>
    </div>
  );
};

export default Home;
