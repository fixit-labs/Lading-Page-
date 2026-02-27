const CHATWOOT_API_URL = process.env.CHATWOOT_API_URL;
const CHATWOOT_API_TOKEN = process.env.CHATWOOT_API_TOKEN;
const CHATWOOT_INBOX_IDENTIFIER = process.env.CHATWOOT_INBOX_ID;

interface SupportTicketData {
    name: string;
    email: string;
    requestType: string;
    requestTypeLabel: string;
    description: string;
}

interface ContactResponse {
    source_id: string;
    pubsub_token: string;
}

interface ConversationResponse {
    id: number;
}

export async function createSupportTicket(data: SupportTicketData) {
    if (!CHATWOOT_API_URL || !CHATWOOT_API_TOKEN || !CHATWOOT_INBOX_IDENTIFIER) {
        console.warn('Chatwoot not configured, skipping ticket creation');
        return null;
    }

    try {
        // Step 1: Create contact using Public API
        const contactResponse = await fetch(
            `${CHATWOOT_API_URL}/public/api/v1/inboxes/${CHATWOOT_INBOX_IDENTIFIER}/contacts`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: data.email,
                    name: data.name,
                    email: data.email,
                }),
            }
        );

        if (!contactResponse.ok) {
            const errorText = await contactResponse.text();
            throw new Error(`Failed to create contact: ${contactResponse.status} - ${errorText}`);
        }

        const contact: ContactResponse = await contactResponse.json();

        // Step 2: Create conversation using Public API
        const conversationResponse = await fetch(
            `${CHATWOOT_API_URL}/public/api/v1/inboxes/${CHATWOOT_INBOX_IDENTIFIER}/contacts/${contact.source_id}/conversations`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }
        );

        if (!conversationResponse.ok) {
            const errorText = await conversationResponse.text();
            throw new Error(`Failed to create conversation: ${conversationResponse.status} - ${errorText}`);
        }

        const conversation: ConversationResponse = await conversationResponse.json();

        // Step 3: Send message with support ticket details
        const messageContent = `📋 **Nueva Solicitud de Soporte**

**Nombre:** ${data.name}
**Email:** ${data.email}
**Tipo de solicitud:** ${data.requestTypeLabel}

---

**Descripción:**
${data.description}`;

        const messageResponse = await fetch(
            `${CHATWOOT_API_URL}/public/api/v1/inboxes/${CHATWOOT_INBOX_IDENTIFIER}/contacts/${contact.source_id}/conversations/${conversation.id}/messages`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: messageContent,
                }),
            }
        );

        if (!messageResponse.ok) {
            const errorText = await messageResponse.text();
            throw new Error(`Failed to send message: ${messageResponse.status} - ${errorText}`);
        }

        console.log('Chatwoot ticket created:', {
            sourceId: contact.source_id,
            conversationId: conversation.id,
        });

        return {
            sourceId: contact.source_id,
            conversationId: conversation.id,
        };
    } catch (error) {
        console.error('Error creating Chatwoot ticket:', error);
        throw error;
    }
}
