import { Prisma,PrismaClient } from "@prisma/client";
import express, { RequestHandler } from "express";
const prisma=new PrismaClient();
interface MakeEventRequestBody {
  organiserId: string;
  organiser: string;
  event_name: string;
  category: string;
  description: string;
  created_at:Date;
  event_date:Date;
  participants:number
}

export const makeEvent: RequestHandler = async(req, res, next) => {
  try {
    const event_date=new Date(req.body.date);
    const eventDetails: MakeEventRequestBody = {
      organiserId: req.body.organiserId,
      organiser: req.body.organiser,
      event_name: req.body.eventName,
      category: req.body.category,
      description: req.body.description,
      created_at:new Date(),
      event_date:event_date,
      participants:parseInt(req.body.participants)
    };
    console.log(req.body.organiserId)
    if (eventDetails.event_name.length==0) {
      return res.json({ message: "Event name required" ,status:400});
    }
    if (eventDetails.category.length == 0)
      return res.json({ message: "Category can't be empty" ,status:400});
    if (eventDetails.description.length == 0) {
      return res.json({ message: "Description required",status:400});
    }
    if (eventDetails.organiserId.length == 0) {
      return res.json({ message: "organiserId required" ,status:400});
    }
    if (eventDetails.organiser.length == 0) {
      return res.json({ message: "organiser required" ,status:400});
    }
   
    
    try {
      const user=await prisma.event.create({
        data:eventDetails
      })
      console.log(user)
    } catch (error) {
      console.log(error);
    }
    
    
   
    return res.json({ message: "success", status: 200 });
  } catch (error) {
    console.log(error);
  }
};
