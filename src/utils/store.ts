import { TASKS } from '@/utils/data';
import _ from 'lodash';
import create from 'zustand';

type FocusTypes = 'TEXT' | 'TASK'

type EditTaskForm = {
  name: TaskText;
  remark?: TaskText;
}

interface TaskState {
  tasks: Task[];
  isEditingNew: boolean;
  currentFocusTextId: Task["id"] | null;
  currentFocusTaskId: Task["id"] | null;
  toggleTask: (targetId: string) => void;
  editTask: (targetId: string, task: EditTaskForm) => void;
  addTask: (name: TaskText, remark?: TaskText) => void;
  deleteTask: (targetId: string) => void;
  setIsEditingNew: (v: boolean) => void;
  changeFocus: (id?: Task["id"], type?: FocusTypes) => void;
  sortTasks: () => void;
}

const findTask = (tempTasks: Task[], targetId: string) => {
  return tempTasks.find(t=> t.id === targetId)
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: TASKS,
  isEditingNew: false,
  currentFocusTextId: null,
  currentFocusTaskId: null,
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
  editTask: (targetId: string, task: EditTaskForm) => set(state => {
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
    const tempTasks: Task[] = _.cloneDeep(state.tasks)

    return {
      tasks: tempTasks.sort((a,b) => {
        if (a.isCompleted && !b.isCompleted) {
          return 1
        }

        if (!a.isCompleted && b.isCompleted) {
          return -1
        }

        return 0
      }),
    }
  }),
}))
