import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://clqepzupvhdbdfaficpu.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscWVwenVwdmhkYmRmYWZpY3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAzMTA3NzgsImV4cCI6MjAxNTg4Njc3OH0.X-KK92TW6ssMLKG38ydzG_KuQNefhwzL9UPzpjnKlIM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})