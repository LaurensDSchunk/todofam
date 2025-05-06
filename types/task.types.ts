export interface Task {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
}

export interface TaskCreateRequest {
  title: string;
  description?: string;
}

export interface TaskUpdateRequest {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}
