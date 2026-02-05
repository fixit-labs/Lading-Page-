import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const supportSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    requestType: z.enum(['webIssue', 'mobileIssue', 'suggestion', 'paymentIssue', 'other'], {
        errorMap: () => ({ message: 'Tipo de solicitud inválido' }),
    }),
    requestTypeLabel: z.string().min(1, 'Etiqueta de tipo requerida'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
});

// Support team email recipients
const SUPPORT_EMAILS = [
    'Hernan.piedrahita@fixitg.com',
    'juan.gonzalez@fixitg.com',
    'yujasly.serna@fixitg.com',
];

// From email address (must be verified in Resend)
const FROM_EMAIL = 'support@parkpool.tech';

export async function POST(request: NextRequest) {
    try {
        // Parse and validate request body
        const body = await request.json();
        const validatedData = supportSchema.parse(body);

        // Send email to support team using Resend
        const { data, error } = await resend.emails.send({
            from: `ParkPool Support <${FROM_EMAIL}>`,
            to: SUPPORT_EMAILS,
            replyTo: validatedData.email,
            subject: `[Soporte ParkPool] ${validatedData.requestTypeLabel} - ${validatedData.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #0B2848; padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">Nueva Solicitud de Soporte</h1>
                    </div>
                    <div style="padding: 20px; background-color: #f8fafc;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 30%;">Nombre:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${validatedData.name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
                                    <a href="mailto:${validatedData.email}">${validatedData.email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Tipo de solicitud:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
                                    <span style="background-color: #0A62F8; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                                        ${validatedData.requestTypeLabel}
                                    </span>
                                </td>
                            </tr>
                        </table>
                        <div style="margin-top: 20px;">
                            <h3 style="color: #0B2848; margin-bottom: 10px;">Descripción:</h3>
                            <div style="background-color: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                                <p style="margin: 0; white-space: pre-wrap;">${validatedData.description}</p>
                            </div>
                        </div>
                    </div>
                    <div style="background-color: #e5e7eb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
                        <p style="margin: 0;">Enviado desde el formulario de soporte de ParkPool</p>
                        <p style="margin: 5px 0 0 0;">Puedes responder directamente a este correo para contactar al usuario.</p>
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            throw new Error(error.message);
        }

        console.log('Support email sent successfully:', {
            name: validatedData.name,
            email: validatedData.email,
            requestType: validatedData.requestType,
        });

        // Return success
        return NextResponse.json(
            {
                success: true,
                message: '¡Solicitud enviada! Te contactaremos pronto',
            },
            { status: 201 }
        );
    } catch (error) {
        // Handle validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: 'Datos inválidos',
                    details: error.errors.map((e) => e.message),
                },
                { status: 400 }
            );
        }

        // Handle other errors
        console.error('Error processing support request:', error);
        return NextResponse.json(
            { error: 'Error al procesar la solicitud' },
            { status: 500 }
        );
    }
}
