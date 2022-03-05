import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UserRow from '../../components/UserRow/UserRow';
import Pipeline from '../../components/Pipeline/Pipeline';

import AddTaskModal from '../../modals/AddTaskModal';

import { useParams } from 'react-router-dom';
import AuthGetApis from '../../actions/AuthGetApis';
import AuthPatchApis from '../../actions/AuthPatchApis';





const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: '30px auto',
    },
    heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    },
    secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(0.5, 0),
      }
  }));

export default function PiplineSingle (props) {

    const [statges, setStatges] = useState([]);

    let { pipeline_id } = useParams();

    const workflow_id = JSON.parse(localStorage.getItem('user')).workflow.id;

    const classes = useStyles();

    const [tasks, setTasks] = useState([]);

    const [editTask, setEditTask] = useState();
    
  


    useEffect(() => {
        AuthGetApis(`/statges/${workflow_id}`, (res, err) => {
            setStatges(res);
        })
        AuthGetApis(`/users/pipeline/${pipeline_id}`, (res, err) => {
            setTasks(res)
        })
    }, [workflow_id])

    const column_grid = 12 / statges.length;


     const updateStatus=(task,statge_ids)=>{
        let allItems=tasks;
        allItems=allItems.map(item=>{

            if(item.id===task.user.id){
                item.tasks.map(task_ => {
                    if (task.id === task_.id) {
                        task.statge.id = statge_ids.current;
                        AuthPatchApis(`/tasks/${task.id}`, {statge: statge_ids.current}, (res,err) => {})
                    }
                })
            }
        return item
        })
        setTasks(allItems)
    }

    const addTasks = (user_id, task) => {
        let allItems=tasks;
        allItems=allItems.map(item=>{

            if(item.id===user_id){
                console.log(task);
                item.tasks.push(task)
            }
        return item
        })
        setTasks(allItems)
    }

    const handleEditTask = (task) => {
        setEditTask(task)
    }

    const statge_mapping = statges.map((statge, index, elements) => {
        const length = elements.length - 1;
        statge.next =  length >= (index + 1) ? elements[index + 1].id : null;
        statge.prev =  index >= 1 ? elements[index - 1].id : null;
       
        return statge;
    });

    const editTaskMethod = (task) => {
        let allItems=tasks;
        allItems=allItems.map(item=>{
            if(item.id===task.user.id){
                item.tasks.map(task_ => {
                    if (task.id === task_.id) {
                       task_.name = task.name;
                       task_.color = task.color;
                       task_.description = task.description;
                       setEditTask(null)
                    }
                })
            }
        return item
        })
        setTasks(allItems)
    }


    return (
        <div className={classes.root}>
           
            <Grid container spacing={3}>
                {statges.map((statge) => (
                 <Grid item xs={column_grid} key={statge.id}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>{statge.name}</Paper>
                    </Grid>
                 </Grid>
                ))}
            </Grid>
            {tasks.map((user) => (
                <UserRow name={user.name} key={user.id}>
                {statge_mapping.map((statge) => (
                    <Pipeline 
                    column_grid={column_grid} 
                    key={'S'+statge.id} 
                    statge={statge} 
                    classes={classes} 
                    tasks={user.tasks} 
                    updateStatus={updateStatus}
                    handleEditTask={handleEditTask}
                    />
                ))}
            </UserRow>
            ))

            }
           
            
            <AddTaskModal 
            pipeline={pipeline_id} 
            statges={statges} 
            addTasks={addTasks} 
            editTask={editTask}
            editTaskMethod={editTaskMethod}
            />
        </div>
     
    );
}