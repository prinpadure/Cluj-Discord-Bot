export function isCodeBlock(content: string): boolean {
    return (content.match(/```/g) || []).length === 2;
}
