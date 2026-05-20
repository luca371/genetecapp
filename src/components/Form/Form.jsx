import { useState, useEffect, useRef } from "react"
import "./Form.css"

const Form = ({ onSave, onCancel }) => {

  const [title, setTitle] = useState("") //title input
  const [date, setDate] = useState("") //date input
  const [priority, setPriority] = useState("Medium") //priority input
  const [assignee, setAssignee] = useState("") //assignee input
  const [category, setCategory] = useState("") //category input
  const [status, setStatus] = useState("") //status input
  const [errors, setErrors] = useState({}) //validation errors
  const [success, setSuccess] = useState(false) //success message

  const titleRef = useRef(null) //ref for first invalid field

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  //validate form fields
  const validate = () => {
    const newErrors = {}
    if (!title.trim()) newErrors.title = "Title is required"
    if (!date) newErrors.date = "Date is required"
    if (!assignee.trim()) newErrors.assignee = "Assignee is required"
    if (!priority) newErrors.priority = "Priority is required"
    if (!status) newErrors.status = "Status is required"
    if (!category) newErrors.category = "Category is required"
    return newErrors
  }

  //handle save
  const handleSave = () => {
    const newErrors = validate()

    //error handling
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      if (newErrors.title) titleRef.current?.focus()
      return
    }

    //create new task
    const newTask = {
      id: `TASK-${Date.now()}`,
      title: title.trim(),
      date,
      priority,
      assignee: assignee.trim(),
      category,
      status
    }

    //success handling
    setSuccess(true)
    setTimeout(() => {
      onSave(newTask)
    }, 1000)
  }

  return (
    <>
      <div className="form-overlay" onClick={onCancel} />
      <div className="form-modal" role="dialog" aria-label="Add new task">
        <h2>New Task</h2>
        {/* success message */}
        {success && (
          <div className="form-success" aria-live="polite">
            Task added successfully!
          </div>
        )}
        {/* title */}
        <div className="form-field">
          <label>Title *</label>
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={e => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: "" })) }}
            placeholder="Enter task title"
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>
        {/* date */}
        <div className="form-field">
          <label>Date *</label>
          <input
            type="date"
            value={date}
            onChange={e => { setDate(e.target.value); setErrors(prev => ({ ...prev, date: "" })) }}
            className={errors.date ? "input-error" : ""}
          />
          {errors.date && <span className="form-error">{errors.date}</span>}
        </div>
        {/* assignee */}
        <div className="form-field">
          <label>Assignee *</label>
          <input
            type="text"
            value={assignee}
            onChange={e => { setAssignee(e.target.value); setErrors(prev => ({ ...prev, assignee: "" })) }}
            placeholder="Enter assignee name"
            className={errors.assignee ? "input-error" : ""}
          />
          {errors.assignee && <span className="form-error">{errors.assignee}</span>}
        </div>
        {/* priority */}
        <div className="form-field">
          <label>Priority *</label>
          <select
            value={priority}
            onChange={e => { setPriority(e.target.value); setErrors(prev => ({ ...prev, priority: "" })) }}
            className={errors.priority ? "input-error" : ""}
          >
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <span className="form-error">{errors.priority}</span>}
        </div>
        {/* status */}
        <div className="form-field">
          <label>Status *</label>
          <select
            value={status}
            onChange={e => { setStatus(e.target.value); setErrors(prev => ({ ...prev, status: "" })) }}
            className={errors.status ? "input-error" : ""}
          >
            <option value="">Select status</option>
            <option value="Todo">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          {errors.status && <span className="form-error">{errors.status}</span>}
        </div>
        {/* category */}
        <div className="form-field">
          <label>Category *</label>
          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setErrors(prev => ({ ...prev, category: "" })) }}
            className={errors.category ? "input-error" : ""}
          >
            <option value="">Select category</option>
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
            <option value="Improvement">Improvement</option>
            <option value="Documentation">Documentation</option>
          </select>
          {errors.category && <span className="form-error">{errors.category}</span>}
        </div>
        <div className="form-buttons">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save Task</button>
        </div>

      </div>
    </>
  )
}

export default Form