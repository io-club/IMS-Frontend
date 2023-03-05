import { Card } from "../Cards";
import { CSSProperties } from "react";
import Image from "next/image";
import checkinStyle from '../Checkins.module.css'

export default function Checkins(props: { style: CSSProperties }) {
    const data = [
        { name: '阿紫', avatar: '/placeholders/114584695.png' },
        { name: '阿迪', avatar: '/placeholders/114589868.png' },
        { name: '阿宋', avatar: '/placeholders/114803848.png' }
    ]
    return <div style={props.style}>
        <Card title={'打卡记录'}>
            <div className={checkinStyle.Wrapper}>
                {
                    data.map(entry => <div key={entry.name} className={checkinStyle.Personnel}>
                        <Image src={entry.avatar} alt={'avatar of ' + entry.name} width={60} height={60} style={{ borderRadius: '30px' }} />
                        <span>{entry.name}</span>
                    </div>)
                }
            </div>
        </Card>
    </div>
}