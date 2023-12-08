export type User = {
  id?: string
  username: string
  created_at?: Date
  updated_at?: Date
}

export type Envelope = {
  id?: string
  description: string
  amount: number
  created_at?: Date
  updated_at?: Date
  user_id: string
}

export type Transaction = {
  id?: string
  payment_amount: number
  payment_recipient: string
  envelope_id: string
  created_at?: Date
  updated_at?: Date
}
