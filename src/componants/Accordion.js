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

  var finance = "In Development";

  var operations = "In Development";
  var clientRelations = "In development";

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Finance</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{finance}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Operations</Typography>
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
            <Typography>Client Relations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{clientRelations}</Typography>
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>
    </div>
  );
};

export default AccordionComp;
