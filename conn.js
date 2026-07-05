
const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://kashishg2311_db_user:Jr344XqJJ49EQu25@cluster0.cwwtvnz.mongodb.net/?appName=Cluster0')
.then((res)=>{
    console.log("successfully");
}).catch(err =>{
    console.log("mongo connection fsiled",err);
}
)


