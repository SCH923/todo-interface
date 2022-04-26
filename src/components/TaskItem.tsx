import React from 'react'
import {Task} from './Types'
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

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

        let newTask: Task = {
            id: task.id,
            text: task.text,
            state: event.target.checked ? "DONE" : "READY"
        }
        putMutation.mutate(newTask)
    }

    const handleDelete = (task: Task) => {
        deleteMutation.mutate(task)
    }

    return (
        <li>
            <Card sx={{ minWidth: 50 }}>
                <label>
                    <input
                        type="checkbox"
                        onClick={(event) => handleDone(event,task)}
                    />
                    <span>
                    {
                        task.state === "DONE" ? <s>{task.text}</s> : task.text
                    }
                    </span>
                </label>
                <button
                    onClick={() => handleDelete(task)}
                >
                    <DeleteIcon/>
                </button>
            </Card>
        </li>
    )
}

export default TaskItem