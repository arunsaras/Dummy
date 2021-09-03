const express = require('express');

const app = express();



app.get('/',(req,res)=>{
    console.dir(res) // false
  res.send('OK')
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

app.listen(process.env.PORT||3000,()=>console.log('Your host 3000 is listening...'))
