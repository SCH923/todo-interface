import { Task } from './Types'
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import "./TaskForm.css"
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';

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
        reset
    } = useForm()

    const onSubmit = (data: any) => {
        const newTask:Task = {
            id: Date.now(),
            text: data.taskText,
            state: "READY"
        }
        postMutation.mutate(newTask)
        reset({taskText:''})
    }

    return (
        <div className="TaskForm">
            <span>タスク入力欄</span>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="FormInput"
                    {...register("taskText", { required: true })}
                />
                <Button
                    type="submit"
                >
                    <SendIcon/>
                </Button>
            </form>
        </div>
    )
}

export default TaskForm