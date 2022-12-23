import gridStyle from '../styles/grid.module.css'
import dashboardStyle from '../styles/dashboard.module.css'

export default function Dashboard() {
    return (
        <div className={dashboardStyle.Dashboard}>
            <div className={dashboardStyle.HeadProminent}>
                仪表台
            </div>
            <div className={gridStyle.GridWrapper}>

            </div>
        </div>
    )
}
