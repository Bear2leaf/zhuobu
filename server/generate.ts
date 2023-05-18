import * as dotenv from 'dotenv';
import { IncomingMessage, ServerResponse } from 'http';

import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai";
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
    if (!configuration.apiKey) {
        throw "OpenAI API key not configured, please follow instructions in README.md";
    }

    const animal = req.body?.animal || '';
    if (animal.trim().length === 0) {
        throw "Please enter a valid animal";
    }

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [generatePrompt(animal)],
        temperature: 0.6,
    });
    res.send({ result: completion.data });
}

function generatePrompt(animal: string) {
    const capitalizedAnimal =
        animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    const content = `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
    return {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content
    }
}
