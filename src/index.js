import express from 'express';
import v1Router from 'routes'

const app = express() // the main app

app.use(express.json())
app.use(express.urlencoded())

app.use('/v1', v1Router)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Todos App.'
  }) 
})

export default app;