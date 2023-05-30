import React from "react";
import "./Home.css";
import Accordion from "./Accordion";
import IconLogo from "./images/kocLogoRaw.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Home = () => {
  //fetch request fuction
  const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

  // api v2 U.S. Ending Stocks excluding SPR of Crude Oil (Thousand Barrels)
  const urlEiaEndingStocksExcSpr =
    "https://api.eia.gov/v2/petroleum/stoc/wstk/data?api_key=f8127de985a95b35a603961cfd50cdbd&data[]=value&facets[duoarea][]=NUS&sort[0][column]=period&sort[0][direction]=desc&facets[series][]=WCESTUS1";

  const urlEiaEndingStocksSpr =
    "https://api.eia.gov/v2/petroleum/stoc/wstk/data?api_key=f8127de985a95b35a603961cfd50cdbd&data[]=value&facets[duoarea][]=NUS&sort[0][column]=period&sort[0][direction]=desc&facets[series][]=WCSSTUS1";

  const urlEiaRefinaryPercentUtilization =
    "https://api.eia.gov/v2/petroleum/pnp/wiup/data?api_key=f8127de985a95b35a603961cfd50cdbd&data[]=value&facets[duoarea][]=NUS&sort[0][column]=period&sort[0][direction]=desc&facets[series][]=WPULEUS3";

  const urlCrudeOilProduction =
    "https://api.eia.gov/v2/petroleum/sum/sndw/data?api_key=f8127de985a95b35a603961cfd50cdbd&data[]=value&facets[duoarea][]=NUS&sort[0][column]=period&start=2000-01-01&sort[0][direction]=desc&facets[series][]=WCRFPUS2";

  async function getEiaData(eiaUrl) {
    const response = await fetch(eiaUrl);
    return response.json();
  }

  const dataEiaEndingStocksExcSpr = getEiaData(urlEiaEndingStocksExcSpr);
  const dataEiaEndingStocksSpr = getEiaData(urlEiaEndingStocksSpr);
  const dataEiaRefinaryPercentUtilizationOperated = getEiaData(
    urlEiaRefinaryPercentUtilization
  );
  console.log(dataEiaRefinaryPercentUtilizationOperated);

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

      <br></br>
      <h2>Different Modules:</h2>
      <div className="accordion">
        <Accordion />
      </div>
    </div>
  );
};

export default Home;
