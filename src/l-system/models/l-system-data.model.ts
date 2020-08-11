import { LSystemOptions } from './l-system-options.model';
import { LSystemRule } from '../l-system-rule.class';
import { LSystemDrawRule } from '../l-system-draw-rule.class';

export interface LSystemData {
    axiom: string;
    options: LSystemOptions;
    rules: LSystemRule[];
    drawRules: LSystemDrawRule[];
}