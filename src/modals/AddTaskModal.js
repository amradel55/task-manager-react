import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,  Fab, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AuthGetApis from '../actions/AuthGetApis'
import AuthPostApis from '../actions/AuthPostApis';
import AuthPatchApis from '../actions/AuthPatchApis';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 45 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '45%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    fixed: {
        position: 'fixed',
        right: 15,
        bottom: 15
      },
    TextField: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        maxWidth: '100%',
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
  }));




let users = [];


export default function AddTaskModal(props) {
    const classes = useStyles();
    const workflow_id = JSON.parse(localStorage.getItem('user')).workflow.id;

    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#fff');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState('');
    const [statge, setStatge] = useState('');
    const [titleofModel, setTitleofModel] = useState('Add New Task')
    const [requestType, setRequestType] = useState('add');
    const handleSubmit = (type) => {
      
      const task = {
        workflow_id,
        title,
        color,
        description,
        pipeline: props.pipeline,
        user: user,
        statge: statge
      }
      console.log(type);
      if (type.requestType === 'add') {
        AuthPostApis('/tasks/create', task, (res, err) => {
          if(!err){
            handleClose()
            res.user = {
              id: res.user
            }
            res.statge = {
              id: res.statge
            }
          props.addTasks(res.user.id,res)
          }
        })
      }else if(type.requestType === 'edit'){
        AuthPatchApis(`/tasks/${props.editTask.id}`, task, (res, err) => {
          if(!err){
            handleClose()
             props.editTaskMethod(res)
          }
        })
      }



    }

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    

   useEffect(() => {
     const task = props.editTask;
     console.log(task);
    if (props.editTask) {
      setTitleofModel('Edit task')
      setRequestType('edit')
      handleOpen()
      setTitle(task.name);
      setColor(props.editTask.color);
      setDescription(task.description);
      setUser(task.user);
      setStatge(task.statge)
    }
  
   },[props.editTask])

      useEffect(() => {
        AuthGetApis(`/users/workflow/${workflow_id}`, (res, err) => {
          let data = res;
          if (data) {
            users = data
          }
        })
      }, [workflow_id])

    const body = (
      <div style={modalStyle} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
            <h1>{titleofModel}</h1>
             <Grid container spacing={3}>
             <Grid item xs={12} md={6}>
                 <TextField 
                 id="standard-basic" 
                 label="Title"  
                 className={classes.TextField}
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                  />

             </Grid>
             <Grid item xs={12} md={6} style={{display: 'flex', alignItems: 'end'}}>
                <input 
                type={'color'} 
                className={classes.TextField}
                value={color}
                onChange={(e) => setColor(e.target.value)}
                />
             </Grid>
             <Grid item xs={12} md={6} >
              <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Statge</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={statge.id}
                    onChange={(e) => setStatge(e.target.value)}
                  >
                  {props.statges.map((statge) => (
                        <MenuItem key={statge.id} value={statge.id} >
                        {statge.name}
                        </MenuItem>
                    ))}
                  </Select>
            </FormControl>
             </Grid>
             {requestType === 'edit' &&
                <Grid item xs={12} md={6} >
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Asign to</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={user.id}
                      onChange={(e) => setUser(e.target.value)}
                    >
                    {users.map((user) => (
                          <MenuItem key={'K'+user.id} value={user.id} >
                          {user.name}
                          </MenuItem>
                      ))}
                    </Select>
              </FormControl>
              </Grid>
             }
           
             <Grid item xs={12} >
             <TextField
                    id="outlined-multiline-static"
                    label="description"
                    multiline
                    rows={4}
                    variant="outlined"
                    className={classes.TextField}
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
             </Grid>
             <Grid item xs={12} >
             <Button 
             variant="contained" 
             color="primary"
             onClick={() => handleSubmit({requestType})}
             >
                     Save
             </Button>
             </Grid>
             </Grid>
        </form>
      </div>
    );
  
    return (
      <div>
          <Fab color="secondary" aria-label="add" className={classes.fixed} onClick={handleOpen}>
                    <AddIcon />
        </Fab>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    );
  }
  