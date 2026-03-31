import { useState, useEffect } from 'react'

// removed supabase import 
// import { supabase } from '../utils/supabase' 

interface Todo {
  id: number
  name: string
}


// fake data just for screen 
const MOCK_TODOS: Todo[] = [
  { id: 1, name: 'Report 1' },
  { id: 2, name: 'Report 2' },
  { id: 3, name: 'Report 3 ' },
]

export default function App() {
  const [todos] = useState<Todo[]>(MOCK_TODOS)

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  )
}
