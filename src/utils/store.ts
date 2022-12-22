import { TASKS } from '@/utils/data';
import _ from 'lodash';
import create from 'zustand';

interface TaskState {
  tasks: Task[];
  isEditingNew: boolean;
  toggleTask: (targetId: string) => void;
  editTask: (task: Task) => void;
  addTask: (name: TaskText, remark?: TaskText) => void;
  deleteTask: (targetId: string) => void;
  setIsEditingNew: (v: boolean) => void;
}

const findTask = (tempTasks: Task[], targetId: string) => {
  return tempTasks.find(t=> t.id === targetId)
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: TASKS,
  isEditingNew: false,
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
  editTask: (task: Task) => set(state => {
    const targetId = task.id
    const tempTasks: Task[] = _.cloneDeep(state.tasks)
    const targetTask = findTask(tempTasks, targetId)

    if (targetTask !== undefined) {
      targetTask.name = task.name
      targetTask.remark = task.remark
    }

    return {
      tasks: tempTasks,
    }
  }),
  addTask: (name: TaskText, remark?: TaskText) => set(state => {
    const tempTasks: Task[] = _.cloneDeep(state.tasks)
    tempTasks.push({
      id: String(new Date()),
      name,
      remark,
      isCompleted: false,
    })

    return {
      tasks: tempTasks,
    }
  }),
  deleteTask: (targetId: string) => set(state => {
    const tempTasks: Task[] = _.cloneDeep(state.tasks)
    const targetTaskIndex = tempTasks.findIndex(t=> t.id === targetId)

    if (targetTaskIndex !== undefined) {
      tempTasks.splice(targetTaskIndex, 1)
    }

    return {
      tasks: tempTasks,
    }
  }),
  setIsEditingNew: (v: boolean) => set(() => {
    return {
      isEditingNew: v,
    }
  }),
}))
