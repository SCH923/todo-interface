import React from 'react'
import {Task} from './Types'

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
                <span>{task.text}</span>
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