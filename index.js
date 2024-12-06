const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const  methodOverride = require('method-override');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const port=8080;
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {   
        id:uuidv4(),
        username:"Mohit",
        content:"I love coding."
    },
    {   
        id:uuidv4(),
        username:"manisha",
        content:"I got my first internship."
    },
    {   
        id:uuidv4(),
        username:"apnacollage",
        content:"we provide information and help student in coding. "
    }
];
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

 app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
     post.content=newContent;
     console.log(newContent);
     res.redirect("/posts");
 });

 app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id !== p.id);
     res.redirect("/posts");
    });

 app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs");
 });
app.listen(port,()=>{
    console.log(`app is listening ${port}`);
});
