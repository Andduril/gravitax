export class GameConfig {
    mass: number;
    width: number;
    color: string;
    fixed: boolean;

    constructor(mass: number, width: number, color: string, fixed: boolean) {
        this.mass = mass;
        this.width = width;
        this.color = color;
        this.fixed = fixed;
    }
}