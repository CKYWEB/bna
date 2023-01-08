type TaskText = string | number | undefined;

type TaskTypeId = React.Key;

type Task = {
  id: string;
  name: TaskText;
  remark?: TaskText;
  isCompleted: boolean;
  deadline: string;
}
