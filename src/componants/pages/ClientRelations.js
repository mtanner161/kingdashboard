import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";

const ClientRelations = () => {
  const address = "Click this button to update all addresses in W Energy";
  const disturbutions =
    "Click this button to import monthly disturbutions in Junpier Square";

  const [isShownAddress, setIsShownAddress] = useState(false);
  const [isShownDis, setIsShownDis] = useState(false);

  const handleClickAddress = (event) => {
    setIsShownAddress((current) => !current);
  };

  const handleClickDisturbution = (event) => {
    setIsShownDis((current) => !current);
  };

  return (
    <div>
      <h1>Client Relations</h1>
      <br></br>
      <h2>{address}</h2>
      <div>
        <Button
          variant="contained"
          color="success"
          onClick={handleClickAddress}
        >
          Update Address
        </Button>
        {isShownAddress && (
          <div>
            <h2>Sucessfully Run</h2>
          </div>
        )}
        <h2>{disturbutions}</h2>
        <div>
          <Button
            variant="contained"
            color="success"
            onClick={handleClickDisturbution}
          >
            Get Monthly Disturbutions
          </Button>
          {isShownDis && (
            <div>
              <h2>Sucessfully Run</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientRelations;
