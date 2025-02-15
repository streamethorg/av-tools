export interface Session {
  id: string
  title: string
  description: string
  speakers: Speaker[]
}

export interface Speaker {
  id: string
  name: string
  description?: string
  avatar: string
  twitter?: string
}
