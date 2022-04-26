import { Task } from './Types'
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const TaskForm: React.FC = () => {

    const queryClient = useQueryClient()

    const postMutation = useMutation((task:Task) => {
        return axios.post('http://localhost:8000/', task)
    }, {
        onSuccess: response => {
            queryClient.setQueryData(['tasks'], response.data)
        }
    })

    const {
        register,
        handleSubmit,
        formState:{ errors }
    } = useForm()

    const onSubmit = (data: any) => {
        const newTask:Task = {
            id: Date.now(),
            text: data.taskText,
            state: "READY"
        }

        postMutation.mutate(newTask)
        console.log(newTask)
    }

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