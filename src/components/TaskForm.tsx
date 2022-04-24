import { Task } from './Types'
import { useForm } from 'react-hook-form';

type Props = {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskForm: React.FC<Props> = ({ tasks, setTasks }) => {

    const {
        register,
        handleSubmit,
        formState:{ errors }
    } = useForm()

    const onSubmit = (data: any) => {
        const newTask:Task = {
            text: data.taskText,
            done: false
        }
        setTasks([newTask, ...tasks])
    }

    //完了チェックが新規投稿時ずれる
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('taskText', { required: true })} />
                {errors.taskText && <p>タスクを入力してください</p>}
                <input type="submit" />
            </form>
        </div>
    )
}

export default TaskForm