const express = require('express')
const app= express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')

const db = mysql.createPool({
  host:"localhost",
  user:"root",
  password:"",
  database: "crud_contact"
})


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/api/get', (req,res)=>{
const sqlGet="SELECT * FROM contact_db"
db.query(sqlGet, (error, result)=>{
 error?(console.log("err",error)):('')
  // console.log("resulerr",result)
  res.send(result)
})
})

app.get('/api/get/:id', (req,res)=>{
  const {id} = req.params 
  const sqlGetOne="SELECT * FROM contact_db WHERE id= ?"
  db.query(sqlGetOne, [id], (error, result)=>{
  
  if(error){
    console.log("err",error)
  }
    
    // console.log("resulerr",result)
    res.send(result)
  })
  })


app.post("/api/post", (req,res)=>{
const {name, email, contact}= req.body;
// const sqlInsert=`INSERT INTO contact_db (name, email, contact) VALUES (${name}, ${email}, ${contact})`
const sqlInsert=`INSERT INTO contact_db (name, email, contact) VALUES (?,?,?)`
db.query(sqlInsert,[name, email, contact], (error, result)=>{
 if(error){
  console.log(error)
 }
 })
})

app.delete("/api/remove/:id", (req,res)=>{
  const {id}= req.params;
  // const sqlInsert=`INSERT INTO contact_db (name, email, contact) VALUES (${name}, ${email}, ${contact})`
  const sqlRemove=`DELETE FROM contact_db WHERE id = ?`
  db.query(sqlRemove,[id], (error, result)=>{
   if(error){
    console.log(error)
   }
   })
  })

 

  app.put("/api/update/:id", (req,res)=>{
    const {id}= req.params;
    const {name, email, contact}= req.body;
console.log(id, name, email, contact)
    const sqlUpdate=`UPDATE contact_db SET name=?, email=?, contact=? WHERE id = ?`
    db.query(sqlUpdate,[name, email, contact, id], (error, result)=>{
     if(error){
      console.log(error)
     } else {
       res.send(result)
     }
     })
    })
  
  

app.get('/', (req,res)=>{
// const sqlInsert="INSERT INTO contact_db (name, email, contact) VALUES ('pepon', 'jjddd@gmail.com', '5565664')"
// db.query(sqlInsert, (error, result)=>{
//   console.log("err",error)
//   console.log("resulerr",result)
//   res.send("hola express")
// })
})


app.listen(5000, ()=>{
console.log('server runing on port 5000')

})