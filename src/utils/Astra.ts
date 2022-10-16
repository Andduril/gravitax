export class Astra {
    name: string;
    mass: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
    color: string;
    radius: number;
    fixed: boolean;

    constructor(x: number, y: number, fixed: boolean, mass: number, color: string, radius: number, vx: number, vy: number, name: string) {
        this.name = name;
        this.mass = mass;
        this.x = x;
        this.y = y;
        this.dx = vx;
        this.dy  = vy;
        this.color = color;
        this.radius = radius;
        this.fixed = fixed;
    }

    update = () => {
        if(!this.fixed) {
            this.x += this.dx;
            this.y += this.dy;
        }
    }

    gravitate = (others: Astra[]) => {
        if(!this.fixed) {
            others.forEach((astra) =>  {
                let dist = Math.sqrt(((Math.pow(astra.x - this.x, 2) + Math.pow(astra.y - this.y, 2))));
                let force = astra.mass / dist;
                let angle = Math.atan2(astra.y - this.y, astra.x - this.x);
    
                let dirx = force * Math.cos(angle);
                let diry = force * Math.sin(angle);
    
                this.dx += dirx / this.mass;
                this.dy += diry / this.mass;
            });
        }
    }
}