'use client'

import Dashboard from "./dashboard/page";
import '../styles/globals.css';
import {store} from "../model/store";
import {Provider} from "react-redux";

export default function Page() {
    return <Provider store={store}>
        <Dashboard />
    </Provider>
}
