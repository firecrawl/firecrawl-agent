import * as ai from 'ai';

declare const formatOutput: ai.Tool<{
    format: "json" | "csv" | "text";
    data?: unknown;
    columns?: string[] | undefined;
}, {
    format: string;
    content: string;
}>;
declare function initBashWithFiles(files: Record<string, string>): Promise<void>;
declare function listBashFiles(): Promise<{
    path: string;
    size: number;
}[]>;
declare function readBashFile(filePath: string): Promise<string>;
declare const bashExec: ai.Tool<{
    command: string;
}, {
    stdout: string;
    stderr: string;
    exitCode: number;
}>;

export { bashExec, formatOutput, initBashWithFiles, listBashFiles, readBashFile };
