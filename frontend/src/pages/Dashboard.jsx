import { useEffect, useState } from "react"

function Dashboard({ sidebarOpen, setSidebarOpen }) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/test/`)
 // Use environment variable for the API URL
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        setMessage(data.message)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching data:", error)
        setError(error.message)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <p className="text-gray-700">Backend says: {message}</p>
      )}
    </div>
  )
}

export default Dashboard
