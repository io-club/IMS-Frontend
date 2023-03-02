import GridGenerator from './gridGenerator'
import '../../styles/globals.css'
import gridStyle from '../../styles/grid.module.css'
import dashboardStyle from '../../styles/Dashboard.module.css'
import cardStyle from '../components/Card.module.css'
import type { Subgrid } from './gridGenerator'
import HeadsUp from '../components/Gadgets/HeadsUp'
import SlugButtons from '../components/SlugButtons'
import { Card } from '../components/Cards'
import Checkins from '../components/Gadgets/Checkins'
import Lights from '../components/Gadgets/Lights'
import Temperature from '../components/Gadgets/Temperature'

export default function Dashboard() {
    const dashboardDefaultGrid = {
        frX: 5,
        frY: 4,
    }
    const grid = new GridGenerator(dashboardDefaultGrid)
    const headsUpGrid: Subgrid = {
        frX: 2,
        frY: 2,
        x: 1,
        y: 1,
    }
    const temperatureGrid: Subgrid = {
        frX: 2,
        frY: 1,
        x: 3,
        y: 1,
    }
    const checkinGrid: Subgrid = {
        frX: 2,
        frY: 1,
        x: 3,
        y: 2,
    }
    const lightGrid: Subgrid = {
        frX: 1,
        frY: 1,
        x: 1,
        y: 3,
    }
    const outletGrid: Subgrid = {
        frX: 1,
        frY: 1,
        x: 2,
        y: 3,
    }

    return (
        <>
            <div className={dashboardStyle.Dashboard}>
                <div className={dashboardStyle.HeadProminent}>
                    仪表台
                    <SlugButtons
                        icon={{
                            image: { src: '/mdi/mic.svg' },
                            alt: 'mic icon',
                        }}
                    >
                        向实验室广播
                    </SlugButtons>
                </div>
                <div className={gridStyle.GridWrapper} style={grid.wrapper()}>
                    <HeadsUp style={grid.pickCard(headsUpGrid)} />
                    <Temperature style={grid.pickCard(temperatureGrid)} />
                    <Checkins style={grid.pickCard(checkinGrid)} />
                    <Lights
                        style={grid.pickCard(lightGrid)}
                        control={'overall'}
                    />
                    <div style={grid.pickCard(outletGrid)}>
                        <Card title={'插座监测'}>
                            <div
                                className={cardStyle.BigNumber}
                                style={{ color: '#492532' }}
                            >
                                87<span style={{ fontSize: '.6em' }}>W</span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
