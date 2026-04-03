import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env['REACT_APP_SUPABASE_URL'] as string
const supabaseAnonKey = process.env['REACT_APP_SUPABASE_ANON_KEY'] as string

console.log('URL:', supabaseUrl)
console.log('KEY:', supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)