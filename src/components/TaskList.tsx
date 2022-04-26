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

    const handleDone = (task:Task) => {
        /*
        setTasks(
            tasks.map(taskItem => {
                if (taskItem === task) {
                    taskItem.done = !taskItem.done
                }
                return taskItem
            })
        ) */
    }

    const handleDelete = (task: Task) => {
        /*
        setTasks(
            tasks.filter(taskItem => taskItem !== task)
        )*/
    }

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
                data.map((task: Task, index: number) => {
                    console.log(index)
                    return (
                        <TaskItem
                            key={index}
                            task={task}
                            handleDone={handleDone}
                            handleDelete={handleDelete}
                        />    
                    )
                })
            }
        </ul>
    )
}

export default TaskList