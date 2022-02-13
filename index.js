const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 8000;
const mongoose = require('mongoose');


app.use(cors());
app.use(express.json());

const schema = new mongoose.Schema({
  subject: String,
  description: String,
  whom: String,
  date: String,
  adminId: String,
});


var Assignments = mongoose.model('assignments',schema);

app.get('/', (req, res) => {
    Assignments.find({},(err,result)=>{res.status(200).json(result.reverse())});
})

const CONNECTION_URL = '------key here------';


app.post('/assignments', (req, res) => {
  const { subject, description, whom, date, adminId, } = req.body; 
  console.log(req.body);
//   res.json(req.body);

  const assignment = new Assignments(
      {
        subject,
        description,
        whom,
        date,
        adminId,
      }
    );

  assignment.save().then(() => {
    res.json(req.body);
  }).catch((err) => res.json({error : "Can't save to mongo!"}));
})

app.listen(port || process.env.PORT, ()=> {
  console.log(`Example app listening at http://localhost:${port}`)
  mongoose.connect(CONNECTION_URL,{
      useNewUrlParser: true ,
      useUnifiedTopology: true
  }).then(()=>{
      console.log('Connection Succesful !!!')
  }).catch((err)=> console.log(err))
})
