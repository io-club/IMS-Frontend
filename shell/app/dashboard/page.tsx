import GridGenerator from "./gridGenerator";
import '../../styles/globals.css'
import gridStyle from '../../styles/grid.module.css'
import dashboardStyle from '../../styles/Dashboard.module.css'
import type {Subgrid} from "./gridGenerator";
import HeadsUp from "../components/HeadsUp";
import SlugButton from "../components/SlugButton";
import Image from "next/image";

export default function Dashboard() {
    const dashboardDefaultGrid = {
        frX: 5,
        frY: 4
    }
    const grid = new GridGenerator(dashboardDefaultGrid)
    const headsUpGrid: Subgrid = {
        frX: 2, frY: 2, x: 1, y: 1
    }
    return (
        <div className={dashboardStyle.Dashboard}>
            <div className={dashboardStyle.HeadProminent}>
                仪表台
                <SlugButton>
                    <Image src={'/mdi/mic.svg'} alt={'mic icon'} width={18} height={18}/>
                    向实验室广播
                </SlugButton>
            </div>
            <div className={gridStyle.GridWrapper} style={grid.wrapper()}>
                <HeadsUp style={grid.pickCard(headsUpGrid)}/>
            </div>
        </div>
    )
}
