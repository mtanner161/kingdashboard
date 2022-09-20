import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const AccordionComp = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  var phaseOne =
    "Debug and get MATLAB model working, then covert to Python, begin open-source customization";

  var phaseTwo =
    "Convert to node.js - begin to build frontend - finalize open source version";
  var phaseThree =
    "Finish frontend web application, share results and handoff to department";

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Phase One</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{phaseOne}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Phase Two</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{phaseTwo}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Phase Three</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{phaseThree}</Typography>
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>
    </div>
  );
};

export default AccordionComp;
