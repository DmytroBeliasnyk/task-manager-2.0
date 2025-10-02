import type {Task} from "./task.ts";

export type List = {
  id: string
  title: string
  description: string
  tasks: Array<Task>
}