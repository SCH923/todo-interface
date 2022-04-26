import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

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

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <TaskForm/>
        <TaskList/>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
