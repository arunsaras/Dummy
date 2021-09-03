const express = require('express');

const app = express();
const BGround = require('fcc-express-background')
const myApp = require('./myApp')

app.get('/',(req,res)=>{
    console.dir(res) // false
  res.send('Hello Express')
  console.dir(res.headersSent) // true
});


app.post('/',(req,res)=>{

  const { body } = req;
  const schema = Joi.object({
    name: Joi.string().min(2).required()
  });

  const result = schema.validate(body);
  if(result.error){
    res.status(400).send('error');
  }else
  res.send(result);
})

// app.listen(process.env.PORT||3000,()=>console.log('Your host 3000 is listening...'))
var port = process.env.PORT || 3000;
BGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function(){
  BGround.log('Node is listening on port '+ port + '...')
});
