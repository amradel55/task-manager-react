import {  Grid, Paper } from "@material-ui/core";
import React, {  useState } from "react";
import Task from "../Task/Task";
import AuthDeleteApis from '../../actions/AuthDeleteApis';

export default function Pipeline(props)   {
    const [tasks, setTasks] = useState(props.tasks)
    const handleDelete = (task) => { 
        AuthDeleteApis(`/tasks/${task.id}`, (res, err) => {
            if (!err) {             
            setTasks(tasks.filter((task_) => { 
                if(task_.id !== task.id){
                    return   task_
                }
            }))
            }
            
        })

    }
            
        return (
           
            <Grid  item xs={props.column_grid}  container direction="column">  
            <Grid  item xs={12}  container direction="column">
                <Paper style={{backgroundColor: 'whitesmoke', padding: 10, minHeight: 200}} >
                {
                tasks.map(task => {
                    if (task.statge.id === props.statge.id) 
                        return <Task 
                        classes={props.classes} 
                        task={task} 
                        paths={{next: props.statge.next, prev: props.statge.prev}} 
                        key={task.id} 
                        updateStatus={props.updateStatus} 
                        handleDelete={handleDelete}
                        handleEditTask={props.handleEditTask}
                        />

                })
                        
                }
                </Paper>
            </Grid>
            </Grid>
        )
    
 }

