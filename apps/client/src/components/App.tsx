import { getAllLists } from '@api/lists';
import type { List } from '@shared/types/list.ts';
import { type FC, useEffect, useState, createContext } from 'react';
import { Header } from './header/Header';
import { Main } from './main/Main';
import { Sidebar } from './sidebar/Sidebar';
import { ItemsManagementFormContextProvider } from './forms/itemsManagement/ItemsManagementFormContextProvider';
import { type Task } from '@shared/types/task';
import { HeaderContextProvider } from './header/HeaderContextProvider';

type ListsContextType = {
  lists: List[];
  addNewList: (newList: List) => void;
  addNewTask: (newTask: Task, listId: string) => void;
  editList: (id: string, title: string, description: string) => void;
  editTask: (editedTask: Task, listId: string) => void;
}

export const ListsContext = createContext<ListsContextType>({
  lists: [],
  addNewList: () => {
  },
  addNewTask: () => {
  },
  editList: () => {
  },
  editTask: () => {
  },
});

export const App: FC = () => {
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    getAllLists().then((lists: List[]) => setLists(lists));
  }, []);

  function addNewList(newList: List): void {
    setLists((prevLists: List[]) => [...prevLists, newList]);
  }

  function addNewTask(newTask: Task, listId: string): void {
    setLists((prevLists: List[]) =>
      prevLists.map((list: List) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list,
      ),
    );
  }

  function editList(id: string, title: string, description: string): void {
    setLists((prevLists: List[]) =>
      prevLists.map((list: List) =>
        list.id === id ? { ...list, title: title, description: description } : list,
      ),
    );
  }

  function editTask(editedTask: Task, listId: string): void {
    const list: List = lists.find((list) => list.id === listId)!;
    const updatedTasks: Task[] = list.tasks.map((task: Task) =>
      task.id === editedTask.id ? editedTask : task,
    );

    setLists((prevLists: List[]) =>
      prevLists.map((list: List) => (list.id === listId ? { ...list, tasks: updatedTasks } : list)),
    );
  }

  return (
    <div className="flex flex-row h-full relative">
      <Sidebar />
      <ListsContext value={{ lists, addNewList, addNewTask, editList, editTask }}>
        <div className="flex flex-col size-full p-4">
          <HeaderContextProvider>
            <Header />
            <ItemsManagementFormContextProvider>
              <Main />
            </ItemsManagementFormContextProvider>
          </HeaderContextProvider>
        </div>
      </ListsContext>
    </div>
  );
};
