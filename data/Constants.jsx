import { BackSide } from "three"

export function MazeConstants() {
    this.wall = {
        HEIGHT: 6,
        THICKNESS: 1,
        SPACE: 8,
        MAT: <meshLambertMaterial color={0x008820} />,
    }
    this.floor = {
        MAT: <meshLambertMaterial color={0xdddddd} />,
    }
    this.lift = {
        LIFT_MAT: <meshLambertMaterial color={0xffffff} transparent={true} opacity={0.1} side={BackSide} />,
        // LIFT_MAT: <meshLambertMaterial color={0xffffff} transparent={true} opacity={0.6} />,
        ARROW_MAT: <meshLambertMaterial color={0xdddd00} />
    }
    this.map = {
        SCALE: 4
    }
}

export function SkyConstant() {
    this.turbidity = 10
    this.rayleigh = 3
    this.mieCoefficient = 0.005
}