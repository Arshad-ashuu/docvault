import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://hcbnyanblkfchcpgeete.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYm55YW5ibGtmY2hjcGdlZXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NDg2NjAsImV4cCI6MjA4NDIyNDY2MH0.-V65cwCs8yfpJVffQ0CXGXKhUdtAOe7yJ4h3mfBsKfw'
)

async function keepAlive() {
  const { error } = await supabase
    .from('user_profiles')
    .select('id')
    .limit(1)

  if (error) {
    console.error(error)
    process.exit(1)
  }

  console.log('Database touched successfully')
}

keepAlive()
