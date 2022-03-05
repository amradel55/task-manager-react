import {  Button, Grid, IconButton, Paper } from "@material-ui/core";
import React from "react";
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Task(props)   {
    const classes = props.classes;

    const next = () => {
        const task = props.task;
       const statge_ids = {
            current : props.paths.next,
        }
    
        props.updateStatus(task, statge_ids)
    }

    const prev = () => {
        const task = props.task;

         const statge_ids = {
            current : props.paths.prev,

        }
    
        props.updateStatus(task, statge_ids)
    }

    const delete_ = (task) => {
        props.handleDelete(task)
    }

    const onEdit = (task) => {
        props.handleEditTask(task)
    }
        return (
            <Grid item xs={12} >
                <Paper className={classes.paper} style={{textAlign: 'left'}}>
                <Typography gutterBottom variant="h5" component="h2" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>{props.task.id}  {props.task.name}</div>
                    <div >
                    <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            aria-label="move selected left"
                            onClick={() => prev()}
                            disabled={!props.paths.prev}

                        >
                            &lt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        aria-label="move selected right"
                        onClick={() => next()}
                        disabled={!props.paths.next}

                        >
                        &gt;
                        </Button>
                    </div>
                   
                     
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.task.description}
                </Typography>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton aria-label="edit"  onClick={() => onEdit(props.task)} >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => delete_(props.task)} >
                        <DeleteIcon />
                    </IconButton>
                </div>

                </Paper>
            </Grid>
        )
    
 }