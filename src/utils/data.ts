import { addDays, format } from "date-fns";

export const TASKS: Task[] = [
  {
    id: '1',
    name: 'do laundry',
    isCompleted: false,
    deadline: '2023-01-02 13:00',
  },
  {
    id: '2',
    name: 'this is a long text this is a long text this is a long text this is a long text this is a long text',
    remark: 'this is remark',
    isCompleted: true,
    deadline: '2023-01-01 09:00',
  },
  {
    id: '3',
    name: 'Finish workout today',
    remark: 'Today is leg day',
    isCompleted: false,
    deadline: format(addDays(new Date(), 3), 'yyyy-MM-dd HH:mm'),

  },
  {
    id: '4',
    name: 'pray',
    remark: 'Jesus is king',
    isCompleted: false,
    deadline: format(addDays(new Date(), 5), 'yyyy-MM-dd HH:mm'),
  },
  {
    id: '5',
    name: 'Listen to Kendrick',
    remark: 'The Big Steppers',
    isCompleted: false,
    deadline: '2023-01-01 09:00',
  },
  {
    id: '6',
    name: 'Contribute my code repository',
    isCompleted: false,
    deadline: '2023-01-03 09:00',
  },
]
