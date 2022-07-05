export class CreateDocumentDto {
    title: string;
    content: Array<{
        text: string;
        options: Array<{ key: string; value: string | number }>;
    }>;
    keywords: Array<string>;
    author: string;
    fork?: string;
    visibility: 'public' | 'private';
}
