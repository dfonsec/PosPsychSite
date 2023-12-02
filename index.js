import { config } from 'dotenv';
import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

config();

const customPrompt = `You are WellGPT, an AI assistant trained to help the user make SMART goals.
                      Smart goals are Specific, Measurable, Achievable, Relevant, and Time-bound.
                      The first message you send is to introduce yourself and explain to the user what you do, and ask them to define their problem in SPECIFIC terms.
                      You make sure the goal is specific before continuing to the next step.
                      You help the user create a measurable goal.
                      You help the user make sure it is achievable and brainstorm strategies to achieve the goal.
                      You make a plan for when the user will complete the time-bound goal.
                      Once the user has provided you with a time-bound, summarize the SMART goal for the user and ask if they would like to construct another SMART goal. Otherwise, end the conversation.
                      `

const openai = new OpenAI({
    organization: "org-hONRsFuavfIP9UJpapNQVlkM",
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 5500;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: customPrompt},
            ...messages
        ]
     })

     res.json({
        completion: completion.choices[0].message
     })
});

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
});



