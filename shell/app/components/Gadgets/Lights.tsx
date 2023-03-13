'use client'

import { CSSProperties, useState } from 'react'
import { Card } from '../Cards'
import cardStyle from '../Card.module.css'

type LightsParam = {
    style: CSSProperties
    control: 'overall'
}
export default function Lights(props: LightsParam) {
    const [light, setLight] = useState(false)

    return (
        <div
            style={props.style}
            onClick={() => {
                setLight(!light)
            }}
        >
            <Card title={'照明'}>
                <span className={cardStyle.Description}>
                    已经全部{light ? '打开' : '关闭'}
                </span>
                <div
                    style={{ transition: '0.5s', opacity: light ? 0 : 1 }}
                    className={cardStyle.DarkBackground}
                />
                <div
                    style={{ transition: '0.5s', opacity: light ? 1 : 0 }}
                    className={cardStyle.BrightBackground}
                />
            </Card>
        </div>
    )
}
