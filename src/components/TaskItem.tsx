import React from 'react'
import {Task} from './Types'
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Button, Checkbox, TextField } from '@mui/material';
import './TaskItem.css'

type Props = {
    task: Task
}

const TaskItem: React.FC<Props> = ({ task }) => {

    const queryClient = useQueryClient()

    const deleteMutation = useMutation((task: Task) => {
        return axios.delete('http://localhost:8000/', { data: task })
    }, {
        onSuccess: response => {
            queryClient.setQueryData(['tasks'], response.data)
        }
    })

    const putMutation = useMutation((task: Task) => {
        return axios.put('http://localhost:8000/' + task.id, task)
    }, {
        onSuccess: response => {
            queryClient.setQueryData(['tasks'], response.data)
        }
    })

    const handleDone = (event: any, task: Task) => {
        
        const newTask: Task = {
            id: task.id,
            text: task.text,
            state: event.target.checked ? "DONE" : "READY"
        }

        putMutation.mutate(newTask)
    }

    const handleDelete = (task: Task) => {
        deleteMutation.mutate(task)
    }

    const handleOnEdit = (event: any, task: Task) => {

        const newTask: Task = {
            id: task.id,
            text: event.target.value,
            state: task.state
        }
        
        putMutation.mutate(newTask)
    }

    return (
        <li className="TaskItem">
            <label>
                <Checkbox
                    checked={task.state === "DONE" ? true : false }
                    onChange={(event) => handleDone(event, task) }
                />
                
                {task.state === "DONE" ?
                    <TextField 
                    className='TaskTextDone'
                    id="standard-basic"
                    variant="standard"
                    value={task.text}
                    onChange={(event) => handleOnEdit(event,task)}
                    />
                    :
                    <TextField 
                    id="standard-basic"
                    variant="standard"
                    value={task.text}
                    onChange={(event) => handleOnEdit(event,task)}
                    />
                }
            </label>
            <Button
                variant="text"
                onClick={() => handleDelete(task)}
            >
                <DeleteIcon />
            </Button>
        </li>
    )
}

export default TaskItem