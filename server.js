const express = require('express')
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const apiRoutes = require('./routes/api')

const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

//  routes
app.use('/api/rates', apiRoutes)
app.get('/', (req, res) => {
  res.send('API is running....')
})

// Handling error middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
