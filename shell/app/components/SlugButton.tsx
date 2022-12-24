'use client'

import React, {useEffect, useRef} from "react";
import buttonStyle from './Buttons.module.css'
import {MDCRipple} from '@material/ripple/index';
import './buttons.scss'


type ButtonProps = {
    children: React.ReactNode
}

export default function SlugButton(props: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        MDCRipple.attachTo(buttonRef.current!)
    })
    return <button className={['mdc-button', 'mdc-button--unelevated', buttonStyle.SlugButton].join(' ')} ref={buttonRef}>
        {props.children}
        <span className="mdc-button__ripple"></span>
        <span className="mdc-button__focus-ring"></span>
    </button>
}