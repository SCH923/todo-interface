import React from 'react'
import {Task} from './Types'
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';

type Props = {
    task: Task
    handleDone: (task: Task) => void
    handleDelete: (task: Task) => void
}

const TaskItem: React.FC<Props> = ({ task, handleDone, handleDelete }) => {
    return (
        <li>
            <Card sx={{ minWidth: 50 }}>
                <label>
                    <input
                        type="checkbox"
                        onClick={() => handleDone(task)}
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