import { ChangeEvent, useState } from 'react'
import { useAtom } from 'jotai'
import { appUserStorageState, registerUser } from '../../work/auth'
import SlugButtons from '../components/SlugButtons'
import popStyles from '../../styles/Pops.module.css'
import cardStyles from '../components/Card.module.css'

type AskForRegistrationProps = {
    cancel: () => void
}

export default function AskForRegistration(props: AskForRegistrationProps) {
    const [username, setUsername] = useState('')
    const [appUserStorage, setAppUserStorage] = useAtom(appUserStorageState)

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value ?? '')
    }

    const handleRegisterUser = () => {
        registerUser(
            username,
            (newValue) => {
                setAppUserStorage({
                    ...appUserStorage,
                    status: newValue,
                })
            },
            () => {}
        )
    }

    return (
        <>
            <div className={popStyles.RegisterBack}>
                <SlugButtons
                    icon={{
                        image: { src: '/mdi/arrow_back.svg' },
                        alt: 'back arrow',
                    }}
                    onClick={props.cancel}
                    className={popStyles.RegisterBackButton}
                />
            </div>
            <div className={popStyles.RegisterInput}>
                <div style={{ maxWidth: '80%' }} className={cardStyles.Title}>
                    为 PassKey 起名
                </div>
                <input onChange={handleUsernameChange} />
            </div>
            <SlugButtons
                className={popStyles.RegisterProceed}
                onClick={handleRegisterUser}
                disabled={username.length < 3}
            >
                Pass
            </SlugButtons>
        </>
    )
}
