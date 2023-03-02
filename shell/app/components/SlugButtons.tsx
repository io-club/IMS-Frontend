'use client'

import React, { useEffect, useRef } from 'react'
import buttonStyle from './Buttons.module.css'
import { MDCRipple } from '@material/ripple/index'
import './buttons.scss'
import Image from 'next/image'

export interface MDImage {
    src: string
}

export interface ButtonImage {
    image: MDImage
    alt: string
}

export type ButtonProps = {
    children?: React.ReactNode
    icon?: ButtonImage
    className?: string
    onClick?: () => void
    disabled?: boolean
}

export default function SlugButtons(props: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const getButtonClass = () => {
        let classes = [
            'mdc-button',
            'mdc-button--unelevated',
            'mdc-button--slug',
            buttonStyle.SlugButton,
            props.className,
        ]
        if (props.disabled) {
            classes.push(buttonStyle.Disabled)
        }
        if (props.icon) {
            if (!props.children) {
                classes.push(buttonStyle.OnlyIcon)
                return classes.join(' ')
            }
            classes.push(buttonStyle.WithIcon)
        }
        return classes.join(' ')
    }

    useEffect(() => {
        MDCRipple.attachTo(buttonRef.current!)
    })

    return (
        <button
            className={getButtonClass()}
            ref={buttonRef}
            onClick={() => {
                !props.disabled && props.onClick && props.onClick()
            }}
        >
            {props.icon && (
                <Image
                    src={props.icon.image.src}
                    alt={props.icon.alt}
                    width={18}
                    height={18}
                />
            )}
            {props.children}
            <span className="mdc-button__ripple"></span>
            <span className="mdc-button__focus-ring"></span>
        </button>
    )
}

