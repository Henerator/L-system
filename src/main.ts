import { Point, GeometricHelper } from './helpers/geometric';
import { LSystem, LSystemRule, LSystemDrawRule, LSystemOptions, LSystemData } from './l-system';
import { RandomHelper } from './helpers/random';
import { KeyboardKeysEnum } from './helpers/keyboard';


const textElement = <HTMLElement>document.getElementById('text');

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const context = <CanvasRenderingContext2D>canvas.getContext('2d');

const width = document.body.clientWidth;
const height = 400;

canvas.width = width;
canvas.height = height;

const groundCenterPoint = <Point>{
    x: width / 2,
    y: height,
};

const pifagorLSystemData = <LSystemData>{
    axiom: '0',
    options: <LSystemOptions>{
        length: 5,
        iterations: 6,
        angle: GeometricHelper.degreeToRadian(45),
    },
    rules: <LSystemRule[]>[
        new LSystemRule('1', '11'),
        new LSystemRule('0', '1[0]0'),
    ],
    drawRules: <LSystemDrawRule[]>[
        new LSystemDrawRule('0', (context, options) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, options.length);
            context.stroke();
        }),
        new LSystemDrawRule('1', (context, options) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, options.length);
            context.stroke();
            context.translate(0, options.length);
        }),
        new LSystemDrawRule('[', (context, options) => {
            context.save();
            context.rotate(-options.angle);
        }),
        new LSystemDrawRule(']', (context, options) => {
            context.restore();
            context.rotate(options.angle);
        }),
    ],
};

const weedLSystemData = <LSystemData>{
    axiom: 'X',
    options: {
        length: 2.5,
        iterations: 6,
        angleRange: {
            min: 20,
            max: 30,
        },
    },
    rules: [
        new LSystemRule('X', 'F-[[X]+X]+F[+FX]-X'),
        new LSystemRule('F', 'FF'),
    ],
    drawRules: [
        new LSystemDrawRule('F', (context, options) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, options.length);
            context.stroke();
            context.translate(0, options.length);
        }),
        new LSystemDrawRule('+', (context, options) => {
            const angle = RandomHelper.rangeInteger(options.angleRange.min, options.angleRange.max);
            context.rotate(GeometricHelper.degreeToRadian(angle));
        }),
        new LSystemDrawRule('-', (context, options) => {
            const angle = RandomHelper.rangeInteger(options.angleRange.min, options.angleRange.max);
            context.rotate(-GeometricHelper.degreeToRadian(angle));
        }),
        new LSystemDrawRule('[', (context) => {
            context.save();
        }),
        new LSystemDrawRule(']', (context) => {
            context.restore();
        }),
    ],
};

const treeLSystemData = <LSystemData>{
    axiom: 'X',
    options: {
        iterations: 12,
        length: 70,
        lengthDecreaseRatio: 0.79,
        width: 6,
        widthDecreaseRatio: 0.87,
        color: 51,
        colorDecreaseRatio: 1.12,
        angleRange: {
            min: 5,
            max: 45,
        },
    },
    rules: [
        new LSystemRule('X', 'F[@[-X]+X]'),
    ],
    drawRules: [
        new LSystemDrawRule('X', (context, options) => {
            context.strokeStyle = '#27FF18';
            context.lineWidth = options.width;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, options.length);
            context.stroke();
        }),
        new LSystemDrawRule('F', (context, options) => {
            context.strokeStyle = `rgb(${options.color}, ${options.color}, ${options.color})`;
            context.lineWidth = options.width;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, options.length);
            context.stroke();
            context.translate(0, options.length);
        }),
        new LSystemDrawRule('+', (context, options) => {
            const angle = RandomHelper.rangeInteger(options.angleRange.min, options.angleRange.max);
            const radianAngle = GeometricHelper.degreeToRadian(angle);
            context.rotate(radianAngle);
        }),
        new LSystemDrawRule('-', (context, options) => {
            const angle = RandomHelper.rangeInteger(options.angleRange.min, options.angleRange.max);
            const radianAngle = GeometricHelper.degreeToRadian(angle);
            context.rotate(-radianAngle);
        }),
        new LSystemDrawRule('[', (context) => {
            context.save();
            currentLSystem.saveState();
        }),
        new LSystemDrawRule(']', (context) => {
            context.restore();
            currentLSystem.restoreState();
        }),
        new LSystemDrawRule('@', (_, options) => {
            options.length *= options.lengthDecreaseRatio;
            options.width = Math.max(1, options.width * options.widthDecreaseRatio);
            options.color *= options.colorDecreaseRatio;
        }),
    ],
};

const lSystemsMap = new Map<string, LSystemData>([
    [KeyboardKeysEnum.P, pifagorLSystemData],
    [KeyboardKeysEnum.W, weedLSystemData],
    [KeyboardKeysEnum.T, treeLSystemData],
]);

let currentLSystem: LSystem;
let lSystemText: string;

document.addEventListener('keypress', (event: KeyboardEvent) => {
    if (lSystemsMap.has(event.code)) {
        setCurrentLSystem(<LSystemData>lSystemsMap.get(event.code));
    }
});

setCurrentLSystem(treeLSystemData);

function setCurrentLSystem(lSystemData: LSystemData) {
    currentLSystem = new LSystem(lSystemData);
    update();
}

function update() {
    lSystemText = currentLSystem.getNext(currentLSystem.options.iterations);
    clear();
    drawAxiom(lSystemText);
}

function drawAxiom(axiom: string) {
    context.save();
    context.translate(groundCenterPoint.x, groundCenterPoint.y);
    context.rotate(Math.PI);

    (axiom || '').split('')
        .forEach(char => currentLSystem.drawRule(char, context));

    context.restore();
}

function clear() {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);
}

function setContentText(text: string) {
    textElement.innerText = text;
}
