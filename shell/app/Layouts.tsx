import Dashboard from './dashboard/page'
import { atom, useAtom } from 'jotai'
import LandPane from './auth/Land'
import layoutStyles from '../styles/Layouts.module.css'

type UserWindowActivation = 'invisible' | 'pop' | 'sheet'

export const userWindowsActivationStatus =
    atom<UserWindowActivation>('invisible')

export default function Layouts() {
    const [userWindowActivation, setUserWindowActivation] = useAtom(
        userWindowsActivationStatus
    )

    return (
        <main>
            {userWindowActivation === 'pop' && (
                <div
                    style={{
                        position: 'fixed',
                        width: '100vw',
                        height: '100vh',
                        top: 0,
                        left: 0,
                        zIndex: '9',
                    }}
                    onClick={() => {
                        setUserWindowActivation('invisible')
                    }}
                />
            )}
            <div
                className={layoutStyles.UserPop}
                style={{ position: 'absolute', top: '2em', right: '3em' }}
            >
                <LandPane />
            </div>
            <Dashboard />
        </main>
    )
}
