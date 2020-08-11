import { Range } from '../../helpers/geometric';


export interface LSystemOptions {
    iterations?: number;

    length?: number;
    lengthDecreaseRatio?: number;
    width?: number;
    widthDecreaseRatio?: number;

    strokeColor?: string;

    color?: number;
    colorDecreaseRatio?: number;

    lengthRange?: Range;
    angleRange?: Range;
}