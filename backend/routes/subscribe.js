import db from "../db.js"
import * as z from "zod"
const subscribeSchema = z.object({
    email:z.string().email()
})
export default function (app){
app.post("/subscribe",(request,reply)=>{
    const {email} = request.body
    const date = Date.now()
    try {
        subscribeSchema.parse({email})

        db.prepare(`INSERT INTO subscribers(email,createdAt)
            VALUES(?,?)`).run(email,date)
        reply.code(201).send({message:"Email successfully added"})
    } catch(err){
        if (err instanceof z.ZodError){
            reply.code(400).send({message:"Please Enter valid Email"})
        } else if  (err.message.includes("UNIQUE")){
            reply.code(409).send({message:"Already subscribed"})
        } else {
            reply.code(500).send({message:"Server Error"})
        }
    }
})
}