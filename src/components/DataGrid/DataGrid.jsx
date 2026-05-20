import { useState, useMemo } from "react"

const DataGrid = ({ data }) => {

  const [columns, setColumns] = useState([
    { label: "ID", accessor: "id", visible: true },
    { label: "Title", accessor: "title", visible: true },
    { label: "Status", accessor: "status", visible: true },
    { label: "Priority", accessor: "priority", visible: true },
    { label: "Assignee", accessor: "assignee", visible: true },
    { label: "Category", accessor: "category", visible: true },
    { label: "Date", accessor: "date", visible: true },
  ])  // columns of the table

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }) // state for sort
  const [filters, setFilters] = useState({}) // filter state
  const [currentPage, setCurrentPage] = useState(1) // current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // rows per page

  return (
    <div>
      <h2>Tasks</h2>
      <p>Data Grid</p>
    </div>
  )
}

export default DataGrid