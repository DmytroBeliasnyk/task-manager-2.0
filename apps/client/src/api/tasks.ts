// TODO: implement error handling

export async function addTask(title: string, description: string, listId: string): Promise<string> {
  const res: Response = await fetch('api/add_task', {
    method: 'POST',
    body: JSON.stringify({ title, description, listId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: { id: string } = await res.json();

  return data.id;
}