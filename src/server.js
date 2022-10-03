require('express-async-errors')

const AppError = require('./utils/AppError')

const migrationsRun = require('./database/sqlite/migrations')

const express = require('express')

const routes = require('./routes')

const app = express()
app.use(express.json())

app.use(routes)

migrationsRun()

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  console.log(error)

  return response.status(500).json({
    status: 'error',
    message: 'erro interno do servidor'
  })
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server esta rodando na porta ${PORT}`))
