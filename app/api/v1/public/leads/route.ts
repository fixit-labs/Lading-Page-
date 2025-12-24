import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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

        // TODO: Integrate with database when ready
        // For now, just log the lead and return success
        console.log('New lead received:', validatedData);

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
