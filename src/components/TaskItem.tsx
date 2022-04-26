import React from 'react'
import {Task} from './Types'
import DeleteIcon from '@mui/icons-material/Delete';
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

    //done check
    const done = task.state === "DONE" ? true : false 
    return (
        <li>
            <label>
                {/*チェックボックスにデフォルト値が設定されていない */}
                <input
                    type="checkbox"
                    onClick={(event) => handleDone(event,task)}
                />
                <input
                    type="text"
                    value={task.text}
                    onChange={(event) => handleOnEdit(event,task)}
                />
            </label>
            <button
                onClick={() => handleDelete(task)}
            >
                <DeleteIcon/>
            </button>
        </li>
    )
}

export default TaskItem