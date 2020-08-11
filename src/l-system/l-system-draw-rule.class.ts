export class LSystemDrawRule {
    constructor(
        private source: string,
        public apply: (context: CanvasRenderingContext2D, options?: any) => void
    ) {
    }

    isMatch(char: string): boolean {
        return this.source === char;
    }
}