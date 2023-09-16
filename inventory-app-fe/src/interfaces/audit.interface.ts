export interface IAudit {
  created_by?: {
    user_id: string;
    user_name: string;
  };
  created_at?: number;
  updated_by?: {
    user_id: string;
    user_name: string;
  }
  updated_at?: number
}
