import React from "react";
import buttonStyle from './Buttons.module.css'

type ButtonProps = {
    children: React.ReactNode
}

export default function SlugButton(props: ButtonProps) {
    return <button className={buttonStyle.SlugButton}>
        {props.children}
    </button>
}