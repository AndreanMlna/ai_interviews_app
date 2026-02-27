'use client';

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";

interface AgentProps {
    userName: string;
    userId: string;
    type: string;
}

interface VapiMessage {
    type: string;
    transcriptType?: string;
    role?: 'user' | 'assistant' | 'system';
    transcript?: string;
}

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

interface SaveMessage {
    role: 'user' | 'system' | 'assistant';
    content: string;
}

const Agent = ({ userName, userId, type }: AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SaveMessage[]>([]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

        const onMessage = (message: VapiMessage) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage: SaveMessage = {
                    role: message.role || 'assistant',
                    content: message.transcript || ""
                };
                setMessages((prev) => [...prev, newMessage]);
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: unknown) => {
            console.error('Vapi Detailed Error:', JSON.stringify(error, null, 2));
            setCallStatus(CallStatus.INACTIVE);
        };

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('error', onError);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
            vapi.off('error', onError);
        }
    }, [])

    useEffect(() => {
        if (callStatus === CallStatus.FINISHED) router.push('/');
    }, [callStatus, router]);

    const handleCall = async () => {
        const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

        if (!workflowId) {
            console.error("Workflow ID is missing");
            return;
        }

        setCallStatus(CallStatus.CONNECTING);

        try {
            /**
             * PERBAIKAN SESUAI TUTORIAL:
             * Urutan parameter vapi.start:
             * 1. assistantId (undefined)
             * 2. assistantOverrides (undefined)
             * 3. squadId (undefined)
             * 4. workflowId (ID dari .env)
             * 5. workflowOverrides (variableValues)
             */
            await vapi.start(
                undefined,
                undefined,
                undefined,
                workflowId,
                {
                    variableValues: {
                        username: userName || "Guest",
                        userid: userId || "anonymous",
                    },
                }
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error("Failed to start call:", errorMessage);
            setCallStatus(CallStatus.INACTIVE);
        }
    }

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    }

    const latestMessages = messages[messages.length - 1]?.content;

    return (
        <>
            <div className="call-view">
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className="object-cover" />
                        {isSpeaking && <span className="animate-speak" />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>

                <div className="card-border">
                    <div className="card-content">
                        <Image src="/baru.png" alt="user avatar" width={130} height={119} className="rounded-full object-cover" />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p key={messages.length} className={cn('transition-opacity duration-500 animate-fadeIn')}>
                            {latestMessages}
                        </p>
                    </div>
                </div>
            )}

            <div className="w-full flex justify-center mt-10">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button
                        className="relative btn-call"
                        onClick={handleCall}
                        disabled={callStatus === CallStatus.CONNECTING}
                    >
                        <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== CallStatus.CONNECTING && 'hidden')} />

                        <span>
                            {callStatus === CallStatus.CONNECTING ? ". . ." : "Call"}
                        </span>
                    </button>
                ) : (
                    <button className="btn-disconnect" onClick={handleDisconnect}>
                        End
                    </button>
                )}
            </div>
        </>
    )
}

export default Agent;