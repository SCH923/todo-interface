import React from 'react'
import {Task} from './Types'
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    task: Task
    handleDone: (task: Task) => void
    handleDelete: (task: Task) => void
}

const TaskItem: React.FC<Props> = ({ task, handleDone, handleDelete }) => {
    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    onClick={() => handleDone(task)}
                />
                <span>
                {
                    task.done ? <s>{task.text}</s> : task.text
                }
                </span>
            </label>
            <button
                onClick={() => handleDelete(task)}
            >
                削除
            </button>
        </li>
    )
}

export default TaskItem