import { useState } from "react"
import { mockData } from "./data/mockData"
import DataGrid from "./components/DataGrid/DataGrid"
import Timeline from "./components/Timeline/Timeline"
import Form from "./components/Form/Form"
import "./App.css"

function App() {
  
  const [tasks, setTasks] = useState(mockData) // state to hold the tasks
  const [showForm, setShowForm] = useState(false) // state to check if the form is open or not
  const [showEasterEgg, setShowEasterEgg] = useState(false) //easter egg 

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
      {/* easter egg info button */}
      <button
        className="info-btn"
        onClick={() => setShowEasterEgg(true)}
        aria-label="About the developer"
      >
        info
      </button>

      {/* easter egg modal */}
      {showEasterEgg && (
        <>
          <div className="form-overlay" onClick={() => setShowEasterEgg(false)} />
          <div className="easter-egg-modal" role="dialog">
            <p>Hi! I know this is outside of the technical assessment, but I wanted to add this small easter egg to introduce myself.</p>
            <p>My name is <strong>Luca</strong> and i am a software developer from Romania passionate about technology. Edin told me the team is what matters most, so I figured the best way to start is by saying hello. Hope you're having a great day! </p>
            <button className="btn-save" onClick={() => setShowEasterEgg(false)}>Close</button>
          </div>
        </>
      )}
    </div>
  )
}

export default App