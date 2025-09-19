import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchTodos = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/api/todos`)
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    try {
      await axios.post(`${API_BASE_URL}/api/todos`, { text })
      setText('')
      await fetchTodos()
    } finally {
      setLoading(false)
    }
  }

  const toggleTodo = async (id, completed) => {
    await axios.put(`${API_BASE_URL}/api/todos/${id}`, { completed: !completed })
    await fetchTodos()
  }

  const deleteTodo = async (id) => {
    await axios.delete(`${API_BASE_URL}/api/todos/${id}`)
    await fetchTodos()
  }

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Todo App</h1>
      <form onSubmit={addTodo} style={{ display: 'flex', gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task"
          style={{ flex: 1, padding: 8 }}
        />
        <button disabled={loading} type="submit">Add</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {todos.map((t) => (
          <li key={t._id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <input type="checkbox" checked={t.completed} onChange={() => toggleTodo(t._id, t.completed)} />
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none', flex: 1 }}>{t.text}</span>
            <button onClick={() => deleteTodo(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
