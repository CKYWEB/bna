import create from 'zustand'
import {TASKS} from "@/utils/data";
import _ from 'lodash';

interface TaskState {
  tasks: Task[]
  toggleTask: (targetId: string) => void
  editTask: (targetId: string, value: string) => void
}

const findTask = (tempTasks: Task[], targetId: string) => {
  return tempTasks.find(t=> t.id === targetId)
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: TASKS,
  toggleTask: (targetId: string) => set(state => {
    const tempTasks: Task[] = _.cloneDeep(state.tasks)
    const targetTask = findTask(tempTasks, targetId)
    if (targetTask !== undefined) {
      targetTask.isCompleted = !targetTask.isCompleted
    }

    return {
      tasks: tempTasks,
    }
  }),
  editTask: (targetId: string, value: string) => set(state => {
    const tempTasks: Task[] = _.cloneDeep(state.tasks)
    const targetTask = findTask(tempTasks, targetId)
    if (targetTask !== undefined) {
      targetTask.value = value
    }

    return {
      tasks: tempTasks,
    }
  }),
}))
