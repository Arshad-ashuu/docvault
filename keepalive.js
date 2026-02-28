import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hcbnyanblkfchcpgeete.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function keepAlive() {
  const { data, error } = await supabase
    .from('your_table_name')
    .select('id')
    .limit(1)

  if (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }

  console.log('Supabase is alive')
}

keepAlive()
