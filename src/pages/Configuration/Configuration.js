import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, Container, IconButton, Paper, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AuthGetApis from '../../actions/AuthGetApis';
import AuthPatchApis from '../../actions/AuthPatchApis';
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



export default function Configuration(props) {
  const [statges, setStatges] = useState([]);
  const workflow_id = JSON.parse(localStorage.getItem('user'))['workflow']['id']

  useEffect(() => {
    AuthGetApis(`/workflows/${workflow_id}`, (res, err) => {
      if(!err){
        setStatges([...res.statges]);
      }
    });
  }, [workflow_id]);

  const [inputText, setInputText] = useState('');

  const classes = useStyles();


  const addStatge = (stageName) => {
    AuthPatchApis(`/workflows/addStatge/${workflow_id}`, {statge: {name: stageName}}, (res, err) =>{
      if (!err) {
        setStatges(oldStatges => [...oldStatges, res]);
        setInputText('');
      }
    })
  }

  const handleDelete = (id) => {
    AuthDeleteApis(`/statges/${id}`, (res, err) => {
      if (!err) {
        if (res.affected === 1) {
          setStatges(statges.filter(item => item.id !== id))
        }
    }
    })
  }
  
  return (
    <div className={classes.root}>
      <h1>Configuration</h1>
       <Container maxWidth="sm">
            <Grid container  spacing={3}>
            {statges.map((value) => (
                    <Grid item xs={12} key={value.id} >
                      <div>
                        <Paper className={classes.paper}>
                            {value.name}
                            <IconButton aria-label="delete" onClick={() => handleDelete(value.id)} >
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
                        label="Add new statge" 
                        variant="outlined" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        />

                       <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            onClick={() => addStatge(inputText)}
                        >
                            Save
                        </Button>

                    </Paper>
                </Grid>
            </Grid>
        </Container>      
        </div>
    
  );
  
}