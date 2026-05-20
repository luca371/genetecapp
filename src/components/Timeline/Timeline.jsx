import { useState, useMemo } from "react"
import "./Timeline.css"

const Timeline = ({ data }) => {

  const [focusedGroup, setFocusedGroup] = useState(null) //current focused week group
  const [focusedItem, setFocusedItem] = useState(null) //current focused item in group
  const [dateFrom, setDateFrom] = useState("") //filter from date
  const [dateTo, setDateTo] = useState("") //filter to date

  //get current week for highlight
  const getCurrentWeekKey = () => {
    const today = new Date()
    const monday = new Date(today)
    monday.setDate(today.getDate() - today.getDay() + 1)
    return monday.toISOString().split("T")[0]
  }

  const currentWeekKey = getCurrentWeekKey()

  //filter data by date range before grouping
  const filteredData = useMemo(() => {
    return data.filter(task => {
      if (dateFrom && task.date < dateFrom) return false
      if (dateTo && task.date > dateTo) return false
      return true
    })
  }, [data, dateFrom, dateTo])

  //group tasks by week
  const groupedByWeek = useMemo(() => {
    const groups = {}
    filteredData.forEach(task => {
      const date = new Date(task.date)
      //get monday
      const monday = new Date(date)
      monday.setDate(date.getDate() - date.getDay() + 1)
      const weekKey = monday.toISOString().split("T")[0]
      if (!groups[weekKey]) groups[weekKey] = []
      groups[weekKey].push(task)
    })
    //sort groups by week
    return Object.entries(groups).sort((a, b) => new Date(a[0]) - new Date(b[0]))
  }, [filteredData])

  //keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      setFocusedGroup(prev => Math.min((prev ?? -1) + 1, groupedByWeek.length - 1))
      setFocusedItem(0)
    }
    if (e.key === "ArrowLeft") {
      setFocusedGroup(prev => Math.max((prev ?? 1) - 1, 0))
      setFocusedItem(0)
    }
    if (e.key === "ArrowDown") {
      const maxItems = groupedByWeek[focusedGroup]?.[1]?.length - 1 || 0
      setFocusedItem(prev => Math.min((prev ?? -1) + 1, maxItems))
    }
    if (e.key === "ArrowUp") {
      setFocusedItem(prev => Math.max((prev ?? 1) - 1, 0))
    }
  }

  return (
    <div
      className="timeline-container"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Task timeline. Use arrow keys to navigate between weeks and tasks."
    >
      <h2>Timeline</h2>

      {/* date range filter */}
      <div className="timeline-filter">
        <label>
          From:
          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="timeline-date-input"
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="timeline-date-input"
          />
        </label>
        {/* clear button - only shows when filters are active */}
        {(dateFrom || dateTo) && (
          <button
            className="timeline-clear-btn"
            onClick={() => { setDateFrom(""); setDateTo("") }}
          >
            Clear
          </button>
        )}
      </div>

      {/* reader announcement */}
      <div aria-live="polite" className="sr-only">
        {focusedGroup !== null && groupedByWeek[focusedGroup] &&
          `Week ${focusedGroup + 1} of ${groupedByWeek.length}: week of ${groupedByWeek[focusedGroup][0]}, 
           task ${focusedItem + 1} of ${groupedByWeek[focusedGroup][1].length}: 
           ${groupedByWeek[focusedGroup][1][focusedItem]?.title}`}
      </div>

      {/* empty state */}
      {groupedByWeek.length === 0 && (
        <p className="timeline-empty">No tasks found for selected date range.</p>
      )}

      {/* timeline groups */}
      <div className="timeline-groups">
        {groupedByWeek.map(([date, tasks], groupIndex) => (
          <div
            key={date}
            className={`timeline-group 
              ${focusedGroup === groupIndex ? "focused" : ""} 
              ${date === currentWeekKey ? "current-week" : ""}`}
          >
            {/* week header */}
            <div className="timeline-date">
              {date === currentWeekKey ? "Current week" : `Week of ${date}`}
            </div>

            {/* tasks for this week */}
            <div className="timeline-items">
              {tasks.map((task, itemIndex) => (
                <div
                  key={task.id}
                  className={`timeline-item ${focusedGroup === groupIndex && focusedItem === itemIndex ? "focused" : ""}`}
                  aria-label={`${task.title}, ${task.status}, ${task.priority} priority`}
                >
                  <span className="timeline-item-title">{task.title}</span>
                  <span className={`timeline-item-status status-${task.status.toLowerCase().replace(" ", "-")}`}>
                    {task.status}
                  </span>
                  <span className={`timeline-item-priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline