import { LSystemOptions, LSystemData } from './models';
import { LSystemRule } from './l-system-rule.class';
import { LSystemDrawRule } from './l-system-draw-rule.class';


export class LSystem {
    public options: LSystemOptions;
    public rules: LSystemRule[];
    public drawRules: LSystemDrawRule[];
    private axiom: string;
    private states: any[] = [];

    constructor(
        data: LSystemData,
    ) {
        this.axiom = data.axiom;
        this.options = this.deepObjClone(data.options);
        this.rules = data.rules;
        this.drawRules = data.drawRules;
    }

    getNext(iterations: number = 1): string {
        while (iterations > 0) {
            this.axiom = (this.axiom || '').split('')
            .map(char => {
                for (let i = 0; i < this.rules.length; i++) {
                    if (this.rules[i].isMatch(char)) {
                        return this.rules[i].apply();
                    }
                }
                return char;
            })
            .join('');
            iterations--;
        }
        return this.axiom;
    }

    drawRule(char: string, context: CanvasRenderingContext2D) {
        const drawRule = this.drawRules.find(rule => rule.isMatch(char));
        if (drawRule) {
            drawRule.apply(context, this.options);
        }
    }

    saveState() {
        this.states.push(this.deepObjClone(this.options));
    }

    restoreState() {
        this.options = this.states.pop();
    }

    private deepObjClone(object: any) : any {
        return JSON.parse(JSON.stringify(object))
    }
}