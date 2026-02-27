import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'support@parkpool.tech';

interface ChatwootWebhookPayload {
    event: string;
    message_type?: string;
    content?: string;
    conversation?: {
        id: number;
        meta?: {
            sender?: {
                name: string;
                email: string;
            };
        };
    };
    sender?: {
        type: string;
        name: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const payload: ChatwootWebhookPayload = await request.json();

        console.log('Chatwoot webhook received:', {
            event: payload.event,
            messageType: payload.message_type,
        });

        // Only process outgoing messages from agents
        if (
            payload.event === 'message_created' &&
            payload.message_type === 'outgoing' &&
            payload.sender?.type === 'user'
        ) {
            const userEmail = payload.conversation?.meta?.sender?.email;
            const userName = payload.conversation?.meta?.sender?.name || 'Usuario';
            const agentName = payload.sender?.name || 'Equipo de Soporte';
            const messageContent = payload.content;

            if (userEmail && messageContent) {
                // Send email to the user with the agent's response
                const { error } = await resend.emails.send({
                    from: `ParkPool Support <${FROM_EMAIL}>`,
                    to: userEmail,
                    subject: `Respuesta a tu solicitud de soporte - ParkPool`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background-color: #0B2848; padding: 20px; text-align: center;">
                                <h1 style="color: white; margin: 0;">Respuesta de Soporte</h1>
                            </div>
                            <div style="padding: 20px; background-color: #f8fafc;">
                                <p style="margin-bottom: 15px;">Hola <strong>${userName}</strong>,</p>
                                <p style="margin-bottom: 15px;">Hemos respondido a tu solicitud de soporte:</p>
                                <div style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0A62F8; margin: 20px 0;">
                                    <p style="margin: 0; white-space: pre-wrap;">${messageContent}</p>
                                </div>
                                <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
                                    Puedes responder directamente a este correo si necesitas más ayuda.
                                </p>
                            </div>
                            <div style="background-color: #e5e7eb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
                                <p style="margin: 0;">Atendido por: ${agentName}</p>
                                <p style="margin: 5px 0 0 0;">Equipo de Soporte ParkPool</p>
                            </div>
                        </div>
                    `,
                });

                if (error) {
                    console.error('Error sending response email:', error);
                    return NextResponse.json(
                        { error: 'Failed to send email' },
                        { status: 500 }
                    );
                }

                console.log('Response email sent to:', userEmail);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}

// Chatwoot may send GET requests to verify the webhook
export async function GET() {
    return NextResponse.json({ status: 'ok' });
}
