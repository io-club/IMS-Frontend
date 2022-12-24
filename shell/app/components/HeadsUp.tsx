import {Card} from "./Cards";
import {CSSProperties} from "react";

export default function HeadsUp(props: { style: CSSProperties }) {
    return (
        <div style={props.style}>
            <Card
                prominence={true}
                version={'large'}
                title={'运行正常'}
            >
                <HeadsUpList/>
            </Card>
        </div>
    );
}

function HeadsUpList() {
    const listCellStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '56px',
        isolation: 'isolate',
        gap: '16px',
        padding: '8px 24px 8px 16px'
    }
    const listIcon: CSSProperties = {
        display: "inline-block",
        height: '40px',
        width: '40px',
        lineHeight: '40px',
        borderRadius: '50%',
        backgroundColor: '#EADDFF',
        verticalAlign: 'middle',
        textAlign: 'center'
    }
    const dataSources = [
        {
            name: '电源',
            status: 'nominal'
        },
        {
            name: '传感器',
            status: 'nominal'
        }
    ]
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            {
                dataSources.map(data =>
                    <div key={data.name} style={listCellStyle}>
                        <span style={listIcon}>A</span>
                        <span>{data.name}</span>
                    </div>
                )
            }
        </div>
    );
}
