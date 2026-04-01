import { useState, useEffect } from 'react';
// removed supabase import 
// import { supabase } from '../utils/supabase' 

interface Report {
  id: number
  name: string
}


// fake data just for screen 
const MOCK_REPORTS: Report[] = [
  { id: 1, name: 'Report 1' },
  { id: 2, name: 'Report 2' },
  { id: 3, name: 'Report 3 ' },
]

export default function App() {
  const [todos] = useState<Report[]>(MOCK_REPORTS)

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  )
}
