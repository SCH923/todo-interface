import axios from 'axios'
import { useState } from 'react';
import { useQuery } from 'react-query'
import TaskItem from './TaskItem'
import { Task } from './Types'

function useTasks() {
    return useQuery("tasks", async () => {
        const { data } = await axios.get(
            "http://localhost:8000/"
        );
        return data;
    });
}

type Filter = 'ALL' | 'DONE' | 'READY'

const TaskList: React.FC = () => {
    const { isLoading, data, error, isFetching } = useTasks()

    const [filter, setFilter] = useState<Filter>('ALL');

    if (isLoading) {
        return (
        <div>
            <span>Loading...</span>
        </div>
        );
    }
    
    const tasks = data.filter((task: Task) => {
        switch (filter) {
            case 'ALL':
                return task

            case 'DONE':
                return task.state === "DONE"

            case 'READY':
                return task.state === "READY"

            default:
                return task
        }
    })

    return (
        <div>
            <select
                defaultValue="ALL"
                onChange={(e) => {
                    
                    setFilter(e.target.value as Filter)
                }}
            >
                <option value="ALL">すべてのタスク</option>
                <option value="DONE">完了したタスク</option>
                <option value="READY">アクティブなタスク</option>
            </select>
            <ul>
                {
                    tasks.map((task: Task) => {
                        return (
                            <TaskItem
                                key={task.id}
                                task={task}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default TaskList