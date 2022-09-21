import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Accordion.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const AccordionComp = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  var finance = "In Development";

  var operations = "In Development";
  var clientRelations = "Current Development";

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Client Relations v1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{clientRelations}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Operations v2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{operations}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Finance v3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{finance}</Typography>
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>
    </div>
  );
};

export default AccordionComp;
