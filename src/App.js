import { useState } from "react"
import { mockData } from "./data/mockData"
import DataGrid from "./components/DataGrid/DataGrid"
import Timeline from "./components/Timeline/Timeline"
import Form from "./components/Form/Form"
import "./App.css"

function App() {
  
  const [tasks, setTasks] = useState(mockData) // state to hold the tasks
  const [showForm, setShowForm] = useState(false) // state to check if the form is open or not

  const handleAddTask = (newTask) => {
    setTasks(prev => [...prev, newTask])  // add new task
    setShowForm(false)
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Work Management Dashboard - Technical Assessment Luca</h1>
        <button className="btn-new-task" onClick={() => setShowForm(true)}> {/* open form button */}
          New Task
        </button>
      </div>

      {showForm && (
        <Form
          onSave={handleAddTask}
          onCancel={() => setShowForm(false)}
        /> 
      )}     {/* form open y/n? */}
      <DataGrid data={tasks} />   
      <Timeline data={tasks} />   
    </div>
  )
}

export default App