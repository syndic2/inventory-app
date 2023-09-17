export interface IAudit {
  created_by?: {
    user_id: string;
    user_name: string;
  };
  created_at?: string;
  updated_by?: {
    user_id: string;
    user_name: string;
  }
  updated_at?: string;
}
