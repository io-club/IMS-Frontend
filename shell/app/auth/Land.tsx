import { ChangeEvent, useEffect, useState } from 'react'
import { AuthenticateStatus, authenticateStatusState, registerUser, loginUser } from '../../work/auth'
import { useAtom } from 'jotai'
import cardStyles from '../components/Card.module.css'
import popStyles from '../../styles/Pops.module.css'
import buttonStyles from '../components/Buttons.module.css'
import SlugButtons from '../components/SlugButtons'
import Image from 'next/image'
import { userWindowsActivationStatus } from '../Layouts'
import { initAuthentication } from '../../work/auth/login'

type UserWindowStage = 'login' | 'register' | 'present' | 'uninitialized'

export default function LandPane() {
    const [username, setUsername] = useState('')
    const [authStatus, setAuthStatus] = useAtom(authenticateStatusState)
    const [userWindowActivation, setUserWindowActivation] = useAtom(
        userWindowsActivationStatus
    )
    const [userWindowStage, setUserWindowStage] =
        useState<UserWindowStage>('uninitialized')

    const handleRegisterUser = () => {
        registerUser(username, setAuthStatus, () => { }).then((r) => { })
    }

    const handleLoginUser = () => {
        loginUser(username, setAuthStatus, () => { }).then((r) => { })
    }

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value ?? '')
    }
    const askForRegistration = () => {
        return (
            <>
                <div className={popStyles.RegisterBack}>
                    <SlugButtons
                        icon={{
                            image: { src: '/mdi/arrow_back.svg' },
                            alt: 'back arrow',
                        }}
                        onClick={() => {
                            setUserWindowStage('uninitialized')
                        }}
                        className={popStyles.RegisterBackButton}
                    />
                </div>
                <div className={popStyles.RegisterInput}>
                    <div
                        style={{ maxWidth: '80%' }}
                        className={cardStyles.Title}
                    >
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

    const askForLogin = () => {
        return (
            <>
                <div className={popStyles.RegisterBack}>
                    <SlugButtons
                        icon={{
                            image: { src: '/mdi/arrow_back.svg' },
                            alt: 'back arrow',
                        }}
                        onClick={() => {
                            setUserWindowStage('uninitialized')
                        }}
                        className={popStyles.RegisterBackButton}
                    />
                </div>
                <div className={popStyles.RegisterInput}>
                    <div
                        style={{ maxWidth: '80%' }}
                        className={cardStyles.Title}
                    >
                        Username
                    </div>
                    <input onChange={handleUsernameChange} />
                </div>
                <SlugButtons
                    className={popStyles.RegisterProceed}
                    onClick={handleLoginUser}
                    disabled={username.length < 3}
                >
                    Pass
                </SlugButtons>
            </>
        )
    }

    const truncatedUsername = (): string => {
        if (username.length < 5) {
            return username
        }
        return username.substring(0, 5) + '…'
    }

    const loggedIn = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    src={'/mdi/check_circle_outline.svg'}
                    alt={'success icon'}
                    width={30}
                    height={30}
                    style={{ opacity: 0.4 }}
                />
                <div style={{ margin: '0 5px 0 8px', whiteSpace: 'nowrap' }}>
                    你好 {truncatedUsername()}
                </div>
            </div>
        )
    }

    useEffect(() => {
        setUserWindowStage('uninitialized')
    }, [userWindowActivation])

    const getWrapperClassName = (): string => {
        let className = [popStyles.PopCard]
        if (userWindowActivation === 'invisible') {
            className.push(popStyles.PopUnexpanded)
            className.push(buttonStyles.SlugButton)
        } else {
            switch (userWindowStage) {
                case 'uninitialized':
                    className.push(popStyles.Small)
                    break
                case 'login':
                    className.push(popStyles.Small)
                    break
                case 'present':
                case 'register':
                    className.push(popStyles.Large)
                    break
            }
        }
        return className.join(' ')
    }

    const uninitialized = () => {
        return (
            <>
                <input
                    type="text"
                    name="username"
                    autoFocus
                    className={popStyles.LoginInput}
                    placeholder={'选择 PassKey'}
                    autoComplete="webauthn"
                />
                <SlugButtons
                    className={popStyles.RegisterButton}
                    onClick={() => {
                        setUserWindowStage('register')
                    }}
                >
                    注册
                </SlugButtons>
            </>
        )
    }

    const registration = () => {
        switch (authStatus) {
            case AuthenticateStatus.SUCCESSFUL:
                return loggedIn()
            case AuthenticateStatus.UNINITIALIZED:
                return askForRegistration()
            case AuthenticateStatus.REGISTERED:
                return <h3>Already Registered</h3>
            default:
                return <></>
        }
    }

    const login = () => {
        switch (authStatus) {
            case AuthenticateStatus.SUCCESSFUL:
                return loggedIn()
            case AuthenticateStatus.UNINITIALIZED:
                return askForLogin()
            case AuthenticateStatus.LOGGEDIN:
                return <h3>Already Logged in</h3>
            default:
                return <></>;
        }
    }

    const switcher = () => {
        if (userWindowActivation === 'invisible') {
            return (
                <Image
                    src={'/mdi/face.svg'}
                    alt={'user'}
                    width={21}
                    height={21}
                />
            )
        }
        switch (userWindowStage) {
            case 'uninitialized':
                return uninitialized()
            case 'register':
                return registration()
            case 'login':
                return login()
            case 'present':
                return <h3>user</h3>
        }
    }

    return (
        <div
            className={getWrapperClassName()}
            onClick={() => {
                setUserWindowActivation('pop')
                initAuthentication()
            }}
        >
            {switcher()}
        </div>
    )
}
