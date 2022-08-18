const { response } = require("express");
const express=require("express");
const app=express();

const mongoose=require("mongoose");
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mynewdb",{
    
},(err)=>{
    if(!err){
        console.log("connect to db")
    }else{
        console.log("error")
    }
})

const sch={
    id:Number,
    name:String,
    email:String,
    age:Number,
    city:String,
    
}
const monmodel=mongoose.model("student1",sch);

//post
app.post("/post",async(req,res)=>{
    console.log("inside post function");

    const data=new monmodel({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
        city:req.body.city,
        
    });
    const val=await data.save();
    res.send("add customer successfull");
});
 
//get
app.get("/get/:email",function(req,res){
    fetchemail=req.params.email;
    monmodel.find(({email:fetchemail}),function(err,val){
        if(err){
            res.send("errrrrr");
        }else{
            if(val.length == 0){
                res.send("Cannot find any customer using this id");
            }else{
                res.send("email already register");
            }
        }

    })
   
});

//put 
app.put("/update/:id",async(req,res)=>{
    let upid=req.params.id;
    let upname=req.body.name;
    let upemail=req.body.email;

    monmodel.findOneAndUpdate({id:upid},{$set:{name:upname,email:upemail}},{new:true},(err,data)=>{
        if(err){
            res.send("Error")
        }else{
            if(data == null){
                res.send("Nothing Found")
            }else{
                res.send(data)
            }
        }
    })
});

//delete

app.delete("/delete/:id",function(req,res){
    let delid=req.params.id;
    monmodel.findOneAndDelete(({id:delid}),function(err,docs){
        if(err){
            res.send("Some Error");
        }else{
            if(docs ==null){
                res.send("No any data");
            }else{
                res.send("delete user successfull");
            }
        }
    })
})

app.listen(3000,()=>{
    console.log("on port 3000")
});
