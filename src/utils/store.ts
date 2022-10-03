import create from 'zustand'
import {TASKS} from "@/utils/data";

interface TaskState {
  tasks: Task[]
  toggleTask: (targetId: string) => void
  editTask: (targetId: string, value: string) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: TASKS,
  toggleTask: (targetId: string) => set((state: any) => {
    const tempTasks = [...state.tasks] // TODO: need better copy method
    tempTasks.forEach(oT=> {
      if (oT.id === targetId) {
        oT.isCompleted = !oT.isCompleted
      }
    })

    return {
      tasks: tempTasks,
    }
  }),
  editTask: (targetId: string, value: string) => set((state: any) => {
    const tempTasks = [...state.tasks] // TODO: need better copy method
    tempTasks.forEach(oT=> {
      if (oT.id === targetId) {
        oT.value = value
      }
    })

    return {
      tasks: tempTasks,
    }
  }),
}))
