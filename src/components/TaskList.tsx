import axios from 'axios'
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

const TaskList: React.FC = () => {
    const { isLoading, data, error, isFetching } = useTasks()

    if (isLoading) {
        return (
        <div>
            <span>Loading...</span>
        </div>
        );
    }

    return (
        <ul>
            {
                data.map((task: Task) => {
                    return (
                        <TaskItem
                            key={task.id}
                            task={task}
                        />    
                    )
                })
            }
        </ul>
    )
}

export default TaskList