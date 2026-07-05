const express=require('express');
const cors=require('cors');

const app=express();
const PORT=4000;

const path=require('path');

require('./conn');
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

const userRoute=require('./Routes/user');
const ResumeRoutes=require('./Routes/resume');

app.use('/api/user',userRoute);
app.use('/api/resume',ResumeRoutes);


app.use(express.static(path.join(__dirname,'build')));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
})

app.listen(PORT,()=>{
    console.log("our backend is running..");
})