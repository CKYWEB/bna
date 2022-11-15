type TaskText = string | number | undefined;

type Task = {
  id: string;
  name: TaskText;
  remark?: TaskText;
  isCompleted: boolean;
}
