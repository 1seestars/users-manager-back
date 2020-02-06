const fs = require('promise-fs')
const uuid = require('uuid')

export const dbGetAllUsers = async () => {
  const data = await fs.readFile('users.json', 'utf-8')

  return JSON.parse(data)
}

export const dbAddNewUser = async fields => {
  const users = await dbGetAllUsers()
  const id = uuid()

  users.push({ id, ...fields })

  await fs.writeFile('users.json', JSON.stringify(users), 'utf-8')

  return {
    id,
    ...fields
  }
}

export const dbFindUser = async id => {
  const todos = await dbGetAllUsers()

  return todos.find(item => item.id === id)
}

export const dbChangeUser = async ({ id, ...fields }) => {
  const todos = await dbGetAllUsers()

  const newTodos = todos.map(item =>
    item.id === id ? { ...item, ...fields } : item
  )

  await fs.writeFile('users.json', JSON.stringify(newTodos), 'utf-8')

  return  newTodos.find(item => item.id === id)
}


export const dbRemoveUser = async id => {
  const todos = await dbGetAllUsers()

  const newTodos = todos.filter(item => item.id !== id)
  await fs.writeFile('users.json', JSON.stringify(newTodos), 'utf-8')
}

export const dbRemoveAllUsers = async () => {
  await fs.writeFile('users.json', JSON.stringify([]), 'utf-8')
}
