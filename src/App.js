import { useState } from "react"
import { mockData } from "./data/mockData"
import DataGrid from "./components/DataGrid/DataGrid"
import Timeline from "./components/Timeline/Timeline"
import Form from "./components/Form/Form"

function App() {
  
  const [tasks, setTasks] = useState(mockData) // state to hold the tasks
  const [showForm, setShowForm] = useState(false) // state to check if the form is open or not

  const handleAddTask = (newTask) => {
    setTasks(prev => [...prev, newTask])  // add new task
    setShowForm(false)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Work Management Dashboard</h1>
      <button onClick={() => setShowForm(true)}> {/* Open form button */}
        New Task
      </button>

      {showForm && (
        <Form
          onSave={handleAddTask}
          onCancel={() => setShowForm(false)}
        /> 
      )}     {/* To show if the form is open */}
      <DataGrid data={tasks} />   {/* Show table grid of tasks */}
      <Timeline data={tasks} />   {/* Show timeline for tasks */}
    </div>
  )
}

export default App