export class LSystemRule {
    constructor(
        private source: string,
        private target: string,
    ) {
    }

    isMatch(char: string): boolean {
        return this.source === char;
    }

    apply(): string {
        return this.target;
    }
}