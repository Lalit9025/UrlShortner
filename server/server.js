import  express  from "express";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import urlRoutes from "./Routes/urlRoutes.js";
import cors from 'cors';
import path from 'path';

dotenv.config();

connectDB();

const app = express();

app.use(express.json())

app.use(cors())

// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('*',(req,res) => {
//     res.sendFile(path.join(__dirname + '/../client/build/index.html'));
// })

//routes
app.use('/urls',urlRoutes)


//rest api
app.get('/',(req,res) => {
    res.send("hello")
});


const PORT = process.env.PORT || 8080;


//run listen
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})