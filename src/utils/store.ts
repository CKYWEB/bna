import { TASKS } from '@/utils/data';
import { immer } from 'zustand/middleware/immer'
import create from 'zustand';
import { format } from "date-fns";

type FocusTypes = 'TEXT' | 'TASK'

type EditTaskForm = {
  name: TaskText;
  remark?: TaskText;
  deadline?: Date;
}

type AddTaskForm = {
  name: TaskText;
  remark?: TaskText;
  deadline?: Date;
}

interface TaskState {
  tasks: Task[];
  isEditingNew: boolean;
  currentFocusTextId: Task["id"] | null;
  currentFocusTaskId: Task["id"] | null;
  currentTaskType: TaskTypeId;
  toggleTask: (targetId: string) => void;
  editTask: (targetId: string, task: EditTaskForm) => void;
  addTask: (v: AddTaskForm) => void;
  deleteTask: (targetId: string) => void;
  setIsEditingNew: (v: boolean) => void;
  setCurrentTaskType: (v: TaskTypeId) => void;
  changeFocus: (id?: Task["id"], type?: FocusTypes) => void;
  sortTasks: () => void;
}

const findTask = (tempTasks: Task[], targetId: string) => {
  return tempTasks.find(t=> t.id === targetId)
}

const formatToFullDate = (d: Date) => {
  return format(d, 'yyyy-MM-dd HH:mm')
}

export const useTaskStore = create(immer<TaskState>((set) => ({
  tasks: TASKS,
  isEditingNew: false,
  currentFocusTextId: null,
  currentFocusTaskId: null,
  currentTaskType: '1',
  toggleTask: (targetId: string) => set(state => {
    const targetTask = findTask(state.tasks, targetId)

    if (targetTask !== undefined) {
      targetTask.isCompleted = !targetTask.isCompleted
    }
  }),
  editTask: (targetId: string, task: EditTaskForm) => set(state => {
    const targetTask = findTask(state.tasks, targetId)

    if (targetTask !== undefined) {
      targetTask.name = task.name
      targetTask.remark = task.remark
      if (task.deadline) {
        targetTask.deadline = formatToFullDate(task.deadline)
      }
    }
  }),
  addTask: (v: AddTaskForm) => set(state => {
    state.tasks.push({
      id: String(new Date()),
      name: v.name,
      remark: v.remark,
      deadline: formatToFullDate(v.deadline ?? new Date()),
      isCompleted: false,
    })
  }),
  deleteTask: (targetId: string) => set(state => {
    const targetTaskIndex = state.tasks.findIndex(t=> t.id === targetId)

    if (targetTaskIndex !== undefined) {
      state.tasks.splice(targetTaskIndex, 1)
    }
  }),
  setIsEditingNew: (v: boolean) => set(() => {
    return {
      isEditingNew: v,
    }
  }),
  setCurrentTaskType: (v: TaskTypeId) => set(() => {
    return {
      currentTaskType: v, 
    }
  }),
  changeFocus: (id?: Task["id"], type?: FocusTypes) => set(() => {
    if (id) {
      if (type === 'TEXT') {
        return {
          currentFocusTextId: id,
          currentFocusTaskId: null,
        }
      }

      if (type === 'TASK') {
        return {
          currentFocusTextId: null,
          currentFocusTaskId: id,
        }
      }
    }

    return {
      currentFocusTextId: null,
      currentFocusTaskId: null,
    }
  }),
  sortTasks: () => set(state => {
    state.tasks.sort((a,b) => {
      if (a.isCompleted && !b.isCompleted) {
        return 1
      }

      if (!a.isCompleted && b.isCompleted) {
        return -1
      }

      return 0
    })
  }),
})))
