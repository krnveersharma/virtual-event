const express=require('express');
const app=express();
const cors=require("cors")
const eventRouter=require('./routes/event');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const port=process.env.PORT;
app.use(bodyParser.json());
const corsOptions={
        origin:"http://localhost:3000",
      methods: "GET, POST, PUT, DELETE, PATCH, HEAD",

}
app.use(cors(corsOptions));

app.use('/event',eventRouter)
app.listen(5000,()=>{
    console.log(`Backend running on port 5000`);
})