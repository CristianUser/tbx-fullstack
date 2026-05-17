import express from 'express'
import cors from 'cors'
import filesController from './controllers/files.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ message: 'Server is running' })
})

// Ideally we should use a router but for now it's just one resource so we can define the routes directly here
app.get('/files/list', filesController.getFiles)
app.get('/files/data', filesController.getFilesData)

const port = process.env.PORT || 3000

export const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
