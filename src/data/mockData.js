const generateItems = () => { // this function generates 200 tasks with random attributes

  // these are the possible values for each task such as status priority, assignee, category
  const statuses = ["Todo", "In Progress", "Done"] 
  const priorities = ["Low", "Medium", "High"]
  const assignees = ["Luca", "Edin", "John", "Joanne", "Sophie"]
  const categories = ["Bug", "Feature", "Improvement", "Documentation"]

  // this is creating the array of 200 tasks that have random values
  return Array.from({ length: 200 }, (_, i) => ({
    id: `TASK-${i + 1}`,
    title: `Task ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    assignee: assignees[Math.floor(Math.random() * assignees.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    date: new Date(2026, Math.floor(Math.random() * 5), Math.floor(Math.random() * 28) + 1) // generates a random date in the next 5 months
      .toISOString()
      .split("T")[0],
  }))
}

export const mockData = generateItems()