export function isCodeBlock(content: string): boolean {
    return (content.match(/```/g) || []).length === 2;
}

export const messages = {
    multiLineCodeBlock: "```",
    codeBlock: "`",
    Done: "Done.",
    NotFound: "Not Found.",
};
