import { useLocale } from '@/contexts/LocaleContext';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

export type Messages = typeof esMessages;

export function useTranslations() {
    const { locale } = useLocale();

    const messages: Messages = locale === 'es' ? esMessages : enMessages;

    return messages;
}
