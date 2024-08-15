import { Prisma,PrismaClient } from "@prisma/client";
import express, { RequestHandler } from "express";
import { stat } from "fs";
const prisma=new PrismaClient();
const jwt = require("jsonwebtoken");
export const signUp=async(req:any,res:any)=>{
    const data=req.body;
    if(data.firstName.length==0){
        return res.json({message:"Firs t Name can't be empty",status:400});
    }
    if(data.username.length==0){
        return res.json({message:"username can't be empty",status:400});
    }
    if(data.email.length==0){
        return res.json({message:"email can't be empty",status:400});
    }
    if(data.password.length==0){
        return res.json({message:"Password can't be empty",status:400});
    }
    try {
        const user=await prisma.user.create({
            data:data
        });
        console.log("id: ",user.id)
        const token=jwt.sign({
            id:user?.id
        },
        "secretkeyappearshere",
        {
            expiresIn:"240h"
        });
        
        res.cookie("userToken",token,{
            httpOnly:true
        })
        return res.json({message:"Successfully created account",status:200})
    } catch (error) {
        return res.json({message:"Email or username already exists",status:400});
    }
    
    
}
export const signIn=async(req:any,res:any)=>{
    const body=req.body;
    const user=await prisma.user.findUnique({
        where:{
            username:body.username
        }
    })
    if(!user){
        return res.json({message:"User not found",status:400})
    }
    if(user.password===body.password){
        return res.json({message:"Success",status:200});
    }
    return res.json({message:"Password not correct",status:400})
}