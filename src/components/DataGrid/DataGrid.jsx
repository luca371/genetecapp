import { useState, useMemo } from "react"
import "./DataGrid.css"

const DataGrid = ({ data }) => {

  const [columns, setColumns] = useState([
    { label: "ID", accessor: "id", visible: true },
    { label: "Title", accessor: "title", visible: true },
    { label: "Status", accessor: "status", visible: true },
    { label: "Priority", accessor: "priority", visible: true },
    { label: "Assignee", accessor: "assignee", visible: true },
    { label: "Category", accessor: "category", visible: true },
    { label: "Date", accessor: "date", visible: true },
  ]) //columns of the table

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }) //state for sort
  const [filters, setFilters] = useState({}) //filter state
  const [currentPage, setCurrentPage] = useState(1) //current page
  const [rowsPerPage, setRowsPerPage] = useState(10) //rows per page
  const [showColumnsMenu, setShowColumnsMenu] = useState(false) //dropdown state

  //filters data based on filter state
  const filteredData = useMemo(() => {
    return data.filter(row => {
      return Object.keys(filters).every(key => {
        if (!filters[key]) return true
        return row[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
      })
    })
  }, [data, filters])

  //sorts filtered data based on sortConfig
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  //slices sorted data based on current page
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return sortedData.slice(start, start + rowsPerPage)
  }, [sortedData, currentPage, rowsPerPage])

  const totalPages = Math.ceil(sortedData.length / rowsPerPage) // total pages

  //toggles sort direction if same key clicked
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }))
  }

  //updates filter state and resets to first page
  const handleFilter = (accessor, value) => {
    setFilters(prev => ({ ...prev, [accessor]: value }))
    setCurrentPage(1)
  }

  //clears all filters and resets to first page
  const handleClearFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  //toggles column visibility
  const toggleColumn = (accessor) => {
    setColumns(prev => prev.map(col =>
      col.accessor === accessor ? { ...col, visible: !col.visible } : col
    ))
  }

  //visible columns
  const visibleColumns = columns.filter(col => col.visible)

  //check if any filter is active
  const hasActiveFilters = Object.values(filters).some(f => f !== "")

  //row counter - start and end of current page
  const rowStart = (currentPage - 1) * rowsPerPage + 1
  const rowEnd = Math.min(currentPage * rowsPerPage, sortedData.length)

  return (
    <div className="datagrid-container">
      <h2>All tasks</h2>

      {/* top controls */}
      <div className="datagrid-controls">

        {/*columns visibitility toggle*/}
        <div className="datagrid-columns-dropdown">
          <button
            className="datagrid-columns-btn"
            onClick={() => setShowColumnsMenu(prev => !prev)}
          >
            Columns ▾
          </button>
          {showColumnsMenu && (
            <div className="datagrid-columns-menu">
              {columns.map(col => (
                <label key={col.accessor}>
                  <input
                    type="checkbox"
                    checked={col.visible}
                    onChange={() => toggleColumn(col.accessor)}
                  />
                  {col.label}
                </label>
              ))}
            </div>
          )}
        </div>

        {/*rows per page*/}
        <div className="datagrid-rows-per-page">
          <label>
            Rows per page:
            <select
              value={rowsPerPage}
              onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1) }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>

        {/*clear filters button*/}
        {hasActiveFilters && (
          <button
            className="datagrid-clear-btn"
            onClick={handleClearFilters}
          >
            ✕ Clear Filters
          </button>
        )}

        {/* Row counter */}
        <span className="datagrid-row-counter">
          {sortedData.length === 0
            ? "No results"
            : `${rowStart}–${rowEnd} of ${sortedData.length} tasks`}
        </span>

      </div>

      {data.length === 0 && <p className="datagrid-empty">No tasks available.</p>}

      {/* Table */}
      {data.length > 0 && (
        <table className="datagrid-table">
          <thead>
            {/* Column headers */}
            <tr>
              {visibleColumns.map(col => (
                <th
                  key={col.accessor}
                  onClick={() => handleSort(col.accessor)}
                >
                  {col.label}
                  {sortConfig.key === col.accessor ? (sortConfig.direction === "asc" ? " ASC" : " DESC") : ""}
                </th>
              ))}
            </tr>
            {/* Filter inputs */}
            <tr>
              {visibleColumns.map(col => (
                <th key={col.accessor}>
                  <input
                    placeholder={`Filter ${col.label}`}
                    value={filters[col.accessor] || ""}
                    onChange={e => handleFilter(col.accessor, e.target.value)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Empty state after filter */}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={visibleColumns.length} className="datagrid-empty">
                  No results found.
                </td>
              </tr>
            )}
            {/* Rows */}
            {paginatedData.map(row => (
              <tr key={row.id}>
                {visibleColumns.map(col => (
                  <td key={col.accessor}>
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination - how it looks in the page */}
      <div className="datagrid-pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>{"<<"}</button>
        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>{"<"}</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>{">"}</button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>{">>"}</button>
      </div>

    </div>
  )
}

export default DataGrid