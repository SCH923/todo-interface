import { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './components/Types'

const initialState: Task[] = [
  {
    text: '次にやるやつ',
    done: false
  },
  {
    text: 'はじめにやるやつ',
    done: true
  }
]

function App() {

  const [tasks, setTasks] = useState(initialState)

  return (
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
  );
}

export default App;
