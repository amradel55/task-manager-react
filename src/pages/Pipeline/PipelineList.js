import { Button, Container, Grid, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import AuthGetApis from '../../actions/AuthGetApis';
import AuthPostApis from '../../actions/AuthPostApis';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AuthDeleteApis from '../../actions/AuthDeleteApis';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      justifyContent: 'space-between'
    },
    inputPaper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      justifyContent: 'start'
    },
    button: {
        margin: theme.spacing(1),
      },
    
  }));

export default function PipelineList() {

    const classes = useStyles();
    const [pipelines, setpipelines] = useState([]);
    const workflow_id = JSON.parse(localStorage.getItem('user')).workflow.id;

    const [newpipeline, setNewpipeline] = useState('');

     const handelSavePip = () => {
        AuthPostApis(`/pipline/create`,
         {
             name: newpipeline,
             workflow_id: workflow_id
         }, (res, err) => {
             if(!err){
                 console.log(res);
                setpipelines(old => [...old, res]);
                setNewpipeline('');
             }
         })
    }
    const handelSinglepip = (id) => {
        window.location.href = `/single-pipeline/${id}`;
    }

    const handleDelete = (id) => {
        AuthDeleteApis(`/pipline/${id}`, (res, err) => {
            if (!err) {
                if (res.affected === 1) {
                    setpipelines(pipelines.filter(item => item.id !== id))
                }
            }
        })
    }

    useEffect(() => {
        AuthGetApis(`/pipline/${workflow_id}`, (res, err) => {
            setpipelines(res)
        })
    }, [workflow_id])

    return (
        <div className={classes.root}>
                <h1>Pipeline List</h1>

            <Container maxWidth="sm">
            <Grid container spacing={3}>
                {pipelines.map((pipline) => (
                    <Grid item xs={12} key={pipline.id} >
                        <div onClick={() => handelSinglepip(pipline.id)}>

                    <Paper className={classes.paper}>
                        {pipline.name}
                        <IconButton aria-label="delete" onClick={() => handleDelete(pipline.id)} >
                             <DeleteIcon />
                        </IconButton>
                    </Paper>
                    </div>

                    </Grid>
                ))}
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <TextField 
                        id="outlined-basic" 
                        label="Add new pipeline" 
                        variant="outlined" 
                        value={newpipeline}
                        onChange={(e) => setNewpipeline(e.target.value)}
                        />

                       <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            onClick={() => handelSavePip()}
                        >
                            Save
                        </Button>

                    </Paper>
                </Grid>
            </Grid>
            </Container>
        </div>
    )

}