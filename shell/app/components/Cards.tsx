import cardStyle from './Card.module.css'
import React from "react";

type CardParams = {
    prominence?: boolean
    title?: string
    version?: 'large' | 'regular'
    children: React.ReactNode
}

export function Card(props: CardParams) {
    const version = props.version ?? 'regular'
    return (
        <div
            className={cardStyle.Card}
            style={{
                backgroundColor: !!props.prominence ? '#FFFBFE' : '#E7E0EC',
                padding: version === 'large' ? '32px 24px 0px 24px' : '23px 22px 0px 22px'
            }}
        >
            {
                props.title
                    ?
                    <div
                        className={version === 'large' ? cardStyle.TitleLarge : cardStyle.Title}
                        style={{color: '#4F378B', zIndex: 9}}
                    >
                        {props.title}
                    </div>
                    :
                    <React.Fragment />
            }
            <React.Fragment>
                {props.children}
            </React.Fragment>
        </div>
    )
}