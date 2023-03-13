import { CSSProperties } from 'react'

type GridPreferences = {
    frX: number
    frY: number
}

export interface Subgrid {
    frX: number
    frY: number
    x: number
    y: number
}

function clamp(number: number, a: number, b: number): number {
    return a > b
        ? Math.min(Math.max(number, b), a)
        : Math.max(Math.min(number, b), a)
}

export default class GridGenerator {
    frX: number
    frY: number
    constructor(props: GridPreferences) {
        this.frX = props.frX
        this.frY = props.frY
    }

    pickCard(props: Subgrid): CSSProperties {
        const a = clamp(props.y, 1, this.frY)
        const b = clamp(props.x, 1, this.frX)
        const c = clamp(props.y + props.frY, 2, this.frY + 1)
        const d = clamp(props.x + props.frX, 2, this.frX + 1)
        return { gridArea: `${a} / ${b} / ${c} / ${d}` } as CSSProperties
    }
    wrapper(): CSSProperties {
        return {
            gridTemplateColumns: `repeat(${this.frX}, 1fr)`,
            gridTemplateRows: `repeat(${this.frY}, 1fr)`,
        }
    }
}
