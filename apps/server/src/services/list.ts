import {List} from "@shared/types/list";
import {getListsFromDB, saveListInDB} from "../repo/list";
import {nanoid} from "nanoid";

export async function saveList(title: string, description: string): Promise<string> {
  const id: string = nanoid()
  await saveListInDB(id, title, description)

  return id
}

export async function getLists(): Promise<List[]> {
  return await getListsFromDB()
}