import TaskItem from './TaskItem'
import { Task } from './Types'

type Props = {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskForm: React.FC<Props> = ({ tasks, setTasks }) => {

    return (
        <div>
        </div>
    )
}

export default TaskForm