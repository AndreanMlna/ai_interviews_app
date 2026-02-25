import { GoogleGenAI } from "@google/genai";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
    return Response.json({success: true, data: 'Thanks you!'}, {status: 200});
}

// Inisialisasi SDK sesuai referensi
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
    const { type, role, level, techstack, amount, userid } = await request.json();

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Prepare question for a job interview.
            The job role is ${role}.
            The job experience level is ${level}.
            The tech stack used in the job is ${techstack}.
            The focus between behavioural and technical question should lean towards: ${type}.
            The amount of question required is: ${amount}.
            Please return the only question, without any additional text.
            The question are going to be ready by a voice assistance so do not use "/" or "*" or any other special characters which migth break the voice assistance.
            Return the question formatted like this:
            ["Question1", "Question2", "Question3"]
            
            Thank you! <3
            `,
        });

        // PERBAIKAN TS18048: Tambahkan fallback string kosong jika undefined
        const questionsRaw = response.text ?? "";

        const cleanedQuestions = questionsRaw.replace(/```json|```/g, "").trim();

        const interview = {
            role,
            type,
            level,
            techstack: techstack.split(','),
            questions: JSON.parse(cleanedQuestions || "[]"), // Fallback ke array kosong jika JSON.parse gagal
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString()
        }

        await db.collection("interviews").add(interview);

        return Response.json({ success: true }, { status: 200 });

    } catch (error: unknown) { // PERBAIKAN TS18046: Gunakan unknown dan Type Guard
        console.error(error);

        // Ambil message hanya jika error adalah instance dari Error
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";

        return Response.json({
            success: false,
            error: errorMessage
        }, { status: 500 });
    }
}