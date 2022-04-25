import axios from 'axios'
import { useQuery } from 'react-query'
import TaskItem from './TaskItem'
import { Task } from './Types'

type Props = {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}


function useTasks() {
    return useQuery("tasks", async () => {
        const { data } = await axios.get(
            "http://localhost:8000/"
        );
        console.log(data)
        return data;
    });
}

const TaskList: React.FC<Props> = ({ tasks, setTasks }) => {

    const { status, data, error, isFetching } = useTasks()
    console.log(data)

    const handleDone = (task:Task) => {
        setTasks(
            tasks.map(taskItem => {
                if (taskItem === task) {
                    taskItem.done = !taskItem.done
                }
                return taskItem
            })
        )
    }

    const handleDelete = (task: Task) => {
        setTasks(
            tasks.filter(taskItem => taskItem !== task)
        )
    }

    return (
        <ul>
            {
                data.map((task: Task, index: number) => {
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