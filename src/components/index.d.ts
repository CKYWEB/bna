type TaskText = string | number | undefined;

type TaskTypeId = '0' | '1' | '2';

type Task = {
  id: string;
  name: TaskText;
  remark?: TaskText;
  isCompleted: boolean;
  deadline: string;
}
