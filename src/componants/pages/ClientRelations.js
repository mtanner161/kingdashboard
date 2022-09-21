import React from "react";
import Button from "@mui/material/Button";

const ClientRelations = () => {
  const address = "Click this button to update all addresses in W Energy";
  const disturbutions =
    "Click this button to import monthly disturbutions in Junpier Square";

  return (
    <div>
      <h1>Client Relations</h1>
      <br></br>
      <h2>{address}</h2>
      <div>
        <Button variant="contained" color="success">
          Update Address
        </Button>
        <br></br>
        <br></br>
        <h2>{disturbutions}</h2>
        <div>
          <Button variant="contained" color="success">
            Get Monthly Disturbutions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientRelations;
