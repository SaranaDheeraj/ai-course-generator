// /api/chapter/getInfo
import { prisma } from "@/lib/db"
import { strict_output } from "@/lib/gpt"
import { getQuestionsFromTranscript, getTranscript, searchYoutube } from "@/lib/youtube"
import { NextResponse } from "next/server"
import { z } from "zod"

const bodyParser = z.object({
    chapterId: z.string()
})

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json()
        const { chapterId } = bodyParser.parse(body)
        console.log(chapterId);
        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId
            }
        })
        if (!chapter) {
            return NextResponse.json({
                success: false,
                error: "Chapter not found"
            }, { status: 404 })
        }
        const videoId = await searchYoutube(chapter.youtubeSearchQuery);
        console.log(videoId);
        let transcript = await getTranscript(videoId)
        let maxLength = 500
        transcript = transcript.split(" ").slice(0, maxLength).join(" ")
        // const  {summary }:{ summary:string } = await strict_output("You are an AI capable of summarizing a youtube transcript in valid JSON format don't use any Double Quotes, Single Quotes, Backslashes, Unescaped Control Characters, Non-ASCII Characters .",
        //     "summarize in 250 words or less and do not talk of the sponsors or anything unrelated to the main topic, also do not introduce what the summary is about make sure the response is in valid JSON format don't use any Double Quotes, Single Quotes, Backslashes, Unescaped Control Characters, Non-ASCII Characters .\n" + transcript, { summary: "summary of the transcript" });
        // console.log(summary+"\n");
        // const questions = await getQuestionsFromTranscript(transcript, chapter.name);
        // console.log(questions);
        // await prisma.question.createMany({
        //     data: questions.map((q) => {
        //         let options = [q.answer, q.option1, q.option2, q.option3,]
        //         options = options.sort(() => Math.random() - 0.5)
        //         return {
        //             question: q.question,
        //             answer: q.answer,
        //             options: JSON.stringify(options),
        //             chapterId: chapterId,
        //         }
        //     })
        // })
        await prisma.chapter.update({
            where: {
                id: chapterId
            },
            data: {
                videoId: videoId,
                // summary: summary,
            },
        })
        return NextResponse.json({success:true})
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                success: false, error: 'Invalid body'
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                success: false,
                error: "unknown"
            }, { status: 500 })
        }
    }
}