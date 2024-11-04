export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      infrastructure_items: {
        Row: {
          id: string
          name: string
          category: string
          status: 'good' | 'bad' | 'na'
          notes: string | null
          images: string[]
          locationId: string | null
          lastUpdated: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          status: 'good' | 'bad' | 'na'
          notes?: string | null
          images?: string[]
          locationId?: string | null
          lastUpdated?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          status?: 'good' | 'bad' | 'na'
          notes?: string | null
          images?: string[]
          locationId?: string | null
          lastUpdated?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          pavilion: 'A' | 'B' | 'C' | 'D'
          floor: number
          type: 'classroom' | 'common' | 'facility'
        }
        Insert: {
          id?: string
          name: string
          pavilion: 'A' | 'B' | 'C' | 'D'
          floor: number
          type: 'classroom' | 'common' | 'facility'
        }
        Update: {
          id?: string
          name?: string
          pavilion?: 'A' | 'B' | 'C' | 'D'
          floor?: number
          type?: 'classroom' | 'common' | 'facility'
        }
      }
    }
  }
}