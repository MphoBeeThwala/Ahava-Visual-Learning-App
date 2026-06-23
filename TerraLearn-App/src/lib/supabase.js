import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function signUp(email, password, metadata = {}) {
  return await supabase.auth.signUp({ email, password, options: { data: metadata } })
}

export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return await supabase.auth.signOut()
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getExperiences(filters = {}) {
  let query = supabase.from('experiences').select('*').eq('is_published', true)
  if (filters.category) query = query.eq('category', filters.category)
  if (filters.grade) query = query.lte('grade_level_min', filters.grade).gte('grade_level_max', filters.grade)
  if (filters.search) query = query.ilike('title', `%${filters.search}%`)
  const { data, error } = await query.order('avg_rating', { ascending: false })
  if (error) throw error
  return data
}

export async function getExperienceById(id) {
  const { data, error } = await supabase.from('experiences').select('*, media_assets(*), hotspots(*), quizzes(*)').eq('id', id).single()
  if (error) throw error
  return data
}

export async function trackProgress(userId, experienceId, progress) {
  return await supabase.from('student_progress').upsert({ user_id: userId, experience_id: experienceId, ...progress, updated_at: new Date().toISOString() })
}

export async function getUserProgress(userId) {
  const { data, error } = await supabase.from('student_progress').select('*, experiences(*)').eq('user_id', userId)
  if (error) throw error
  return data
}

export async function createClass(teacherId, classData) {
  return await supabase.from('classes').insert({ teacher_id: teacherId, ...classData }).select().single()
}

export async function getClasses(teacherId) {
  const { data, error } = await supabase.from('classes').select('*, class_students(count)').eq('teacher_id', teacherId)
  if (error) throw error
  return data
}

export async function createAssignment(assignmentData) {
  return await supabase.from('assignments').insert(assignmentData)
}

export async function uploadMedia(file, path) {
  const { data, error } = await supabase.storage.from('experience-media').upload(path, file)
  if (error) throw error
  return data
}

export async function getPublicUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
