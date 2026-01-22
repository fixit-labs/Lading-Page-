import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Validation schema
const leadSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    companyName: z.string().min(2, 'El nombre de la empresa debe tener al menos 2 caracteres'),
    phone: z.string().optional(),
});

// Configure email transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function POST(request: NextRequest) {
    try {
        // Parse and validate request body
        const body = await request.json();
        const validatedData = leadSchema.parse(body);

        // Send email to requests@parkpool.tech
        await transporter.sendMail({
            from: process.env.SMTP_FROM || 'noreply@parkpool.tech',
            to: 'requests@parkpool.tech',
            subject: `Nueva solicitud de demo - ${validatedData.companyName}`,
            html: `
                <h2>Nueva solicitud de demo</h2>
                <p><strong>Nombre:</strong> ${validatedData.name}</p>
                <p><strong>Empresa:</strong> ${validatedData.companyName}</p>
                <p><strong>Email:</strong> ${validatedData.email}</p>
                <p><strong>Teléfono:</strong> ${validatedData.phone || 'No proporcionado'}</p>
                <hr>
                <p><em>Enviado desde el formulario de la landing page de ParkPool</em></p>
            `,
            text: `
            Nueva solicitud de demo

            Nombre: ${validatedData.name}
            Empresa: ${validatedData.companyName}
            Email: ${validatedData.email}
            Teléfono: ${validatedData.phone || 'No proporcionado'}

            ---
            Enviado desde el formulario de la landing page de ParkPool
            `,
        });

        console.log('Lead email sent successfully:', validatedData);

        // Return success
        return NextResponse.json(
            {
                success: true,
                message: '¡Gracias! Te contactaremos pronto',
                leadId: 'temp-' + Date.now(),
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
        console.error('Error creating lead:', error);
        return NextResponse.json(
            { error: 'Error al procesar la solicitud' },
            { status: 500 }
        );
    }
}