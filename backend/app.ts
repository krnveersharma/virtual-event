const express=require('express');
const app=express();
const cors=require("cors")
const eventRouter=require('./routes/event');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
dotenv.config()
const CORS_LINK=process.env.CORS_LINK;
const PORT=5000
app.use(bodyParser.json());
const corsOptions={
        origin:CORS_LINK,
      methods: "GET, POST, PUT, DELETE, PATCH, HEAD",

}
app.use(cors(corsOptions));
app.use('/event',eventRouter)
app.listen(PORT,()=>{
    console.log(`Backend running on port ${PORT}`);
})