import express, { RequestHandler } from "express";
interface MakeEventRequestBody {
  event: string;
  category: string;
  description: string;
}

export const makeEvent: RequestHandler = (req, res, next) => {
  try {
    const eventDetails: MakeEventRequestBody = {
      event: req.body.event || "",
      category: req.body.category,
      description: req.body.description,
    };
    console.log("body: ",req.body);
    return res.json({message:"success",status:200})
  } catch (error) {
    console.log(error);
  }
};
