import app from 'src';

// set default to 3000
const port = process.env.PORT || 3000; 

app.listen(port, () => console.log('App listerning on port ' + port))