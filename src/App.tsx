import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './components/Types'

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 300000,
      },
    },
});
  
function App() {

  const initialState: Task[] = []
  const [tasks, setTasks] = useState(initialState)

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
