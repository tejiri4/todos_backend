import express from 'express';

const app = express() // the main app

const port = process.env.PORT || 3000; 

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.send('Welcome to Todos App.') 
})

app.listen(port, () => console.log('App listerning on port ' + port))