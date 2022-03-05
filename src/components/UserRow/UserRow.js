import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@material-ui/core";
import React, { useState } from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function UserRow(props)   {

    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <h1>{props.name}</h1>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container spacing={3}>

                {props.children}
            </Grid>
            </AccordionDetails>

            </Accordion>
            </Grid>
            </Grid>
        )
    
 }

