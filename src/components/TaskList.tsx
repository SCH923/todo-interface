import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
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
    const queryClient = useQueryClient()
    const { isLoading, data, error, isFetching } = useTasks()

    const deleteMutation = useMutation((task: Task) => {
        return axios.delete('http://localhost:8000/', { data: task })
    }, {
        onSuccess: response => {
            queryClient.setQueryData(['tasks'], response.data)
        }
    })

    const putMutation = useMutation((task: Task) => {
        return axios.put('http://localhost:8000/' + task.id, task)
    }, {
        onSuccess: response => {
            queryClient.setQueryData(['tasks'], response.data)
        }
    })

    const handleDone = (event: any, task: Task) => {
        
        let newTask:Task = {
            id: task.id,
            text: task.text,
            state: event.target.checked ? "DONE" : "READY"
        }
        putMutation.mutate(newTask)
    }

    const handleDelete = (task: Task) => {
       deleteMutation.mutate(task)
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
                data.map((task: Task) => {
                    return (
                        <TaskItem
                            key={task.id}
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