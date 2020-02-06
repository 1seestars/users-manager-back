import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {
  dbGetAllUsers,
  dbAddNewUser,
  dbFindUser,
  dbChangeUser,
  dbRemoveUser,
  dbRemoveAllUsers
} from 'utils/dbUtils'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/users', async (req, res) => {
  const todos = await dbGetAllUsers()

  return res.json(todos)
})

app.post('/user', async (req, res) => {
  const {
    body: { firstName, lastName, email, gender, birthday, password, workplaces }
  } = req

  const newUser = await dbAddNewUser({
    firstName,
    lastName,
    email,
    gender,
    birthday,
    password,
    workplaces
  })

  return res.json(newUser)
})

app.get('/user/:id?', async (req, res) => {
  const { id } = req.params

  if (id) {
    const item = await dbFindUser(id)

    return item
      ? res.json(item)
      : res.status(400).json({ message: 'No such an item' })
  }

  return res.status(400).json({ message: 'No id provided' })
})

app.put('/user/:id?', async (req, res) => {
  const { id } = req.params
  const {
    firstName,
    lastName,
    email,
    gender,
    birthday,
    password,
    workplaces
  } = req.body

  if (!!id) {
    const item = await dbFindUser(id)

    if (item) {
      const updatedItem = await dbChangeUser({
        id,
        firstName,
        lastName,
        email,
        gender,
        birthday,
        password,
        workplaces
      })

      return res.json(updatedItem)
    }

    return res.status(400).json({ message: 'No such a user' })
  }

  return res.status(400).json({ message: 'No id provided' })
})

app.delete('/user/:id?', async (req, res) => {
  const { id } = req.params

  if (id) {
    const item = await dbFindUser(id)

    if (item) {
      await dbRemoveUser(id)

      return res.status(200).json({ message: 'item has been removed' })
    }

    return res.status(400).json({ message: 'No such an item' })
  }

  return res.status(400).json({ message: 'No id provided' })
})

app.delete('/users', async (req, res) => {
  await dbRemoveAllUsers()

  return res.status(200).json({ message: 'All users have been removed' })
})

app.listen(4000, () => {
  console.log('App running on port 4000!')
})
