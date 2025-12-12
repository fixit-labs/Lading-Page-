import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Validation schema
const leadSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    companyName: z.string().min(2, 'El nombre de la empresa debe tener al menos 2 caracteres'),
    phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        // Parse and validate request body
        const body = await request.json();
        const validatedData = leadSchema.parse(body);

        // Check if email already exists
        const existingLead = await prisma.lead.findUnique({
            where: { email: validatedData.email },
        });

        if (existingLead) {
            return NextResponse.json(
                { error: 'Este email ya está registrado' },
                { status: 400 }
            );
        }

        // Create new lead
        const lead = await prisma.lead.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                companyName: validatedData.companyName,
                phone: validatedData.phone || null,
                status: 'NEW',
            },
        });

        // Return success
        return NextResponse.json(
            {
                success: true,
                message: '¡Gracias! Te contactaremos pronto',
                leadId: lead.id,
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
