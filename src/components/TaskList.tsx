import TaskItem from './TaskItem'
import { Task } from './Types'

type Props = {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskList: React.FC<Props> = ({ tasks, setTasks }) => {

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
                tasks.map((task: Task, index: number) => {
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