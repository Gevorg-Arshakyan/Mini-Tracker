export interface Task {
  id?: string;
  _id?: string; // fallback for MongoDB documents without virtuals
  title: string;
  completed: boolean;
}

export interface CreateTaskRequest {
  title: string;
  completed?: boolean;
}

export interface UpdateTaskRequest {
  title?: string;
  completed?: boolean;
}


