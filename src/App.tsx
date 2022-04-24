import axios from 'axios';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './components/Types'

function useTasks() {
  return useQuery("tasks", async () => {
    const { data } = await axios.get(
      "http://localhost:8000/"
    );
    return data;
  });
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 300000,
      },
    },
  });

  const { status, data, error, isFetching } = useTasks()

  const initialState: Task[] = []
  const [tasks, setTasks] = useState(initialState)

  useEffect(()=>{
    setTasks(data)
  },[data])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <TaskForm
          tasks={tasks}
          setTasks={setTasks}
        />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
