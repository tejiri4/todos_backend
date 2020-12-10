import express from 'express';
import v1Router from 'routes'

const app = express() // the main app

const port = process.env.PORT || 3000; 

app.use(express.json())
app.use(express.urlencoded())

app.use('/v1', v1Router)

app.get('/', (req, res) => {
  res.send('Welcome to Todos App.') 
})

app.listen(port, () => console.log('App listerning on port ' + port))