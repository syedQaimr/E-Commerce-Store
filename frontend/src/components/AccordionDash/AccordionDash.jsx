import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionDash(props) {
  return (
    <div>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontFamily : "Arial", fontWeight: 'bold' }}>{props.topRatedProducts[0].name}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{fontFamily : "Arial", fontWeight: 'bold' }}>
          <Typography style={{fontFamily : "Arial", fontWeight: 'bold' }}>
          {props.topRatedProducts[0].description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={{fontFamily : "Arial", fontWeight: 'bold' }}>{props.topRatedProducts[1].name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{fontFamily : "Arial", fontWeight: 'bold' }}>
          {props.topRatedProducts[1].description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={{fontFamily : "Arial", fontWeight: 'bold' }}>{props.topRatedProducts[2].name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{fontFamily : "Arial", fontWeight: 'bold' }}>
          {props.topRatedProducts[2].description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={{fontFamily : "Arial", fontWeight: 'bold' }}>{props.topRatedProducts[3].name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{fontFamily : "Arial", fontWeight: 'bold' }}>
          {props.topRatedProducts[3].description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      
    </div>
  );
}
