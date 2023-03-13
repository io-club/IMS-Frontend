import { useEffect, useState } from 'react'
import {
    AuthenticateStatus,
    appUserStorageState,
    startUserAuthentication,
} from '../../work/auth'
import { useAtom } from 'jotai'
import popStyles from '../../styles/Pops.module.css'
import buttonStyles from '../components/Buttons.module.css'
import SlugButtons from '../components/SlugButtons'
import Image from 'next/image'
import { userWindowsActivationStatus } from '../Layouts'
import AskForRegistration from './Registration'
import UserProfileCapsule from './Profile'
import { browserSupportsWebAuthnAutofill } from '@simplewebauthn/browser'

type UserWindowStage = 'register' | 'present' | 'uninitialized'

export default function LandPane() {
    const [appUserStatus, setAppUserStatus] = useAtom(appUserStorageState)
    const [userWindowActivation, setUserWindowActivation] = useAtom(
        userWindowsActivationStatus
    )
    const [userWindowStage, setUserWindowStage] =
        useState<UserWindowStage>('uninitialized')

    const handleCancelRegisteration = () => {
        setUserWindowStage('uninitialized')
    }
    const testBrowserAutofill = async (): Promise<boolean> => {
        if (appUserStatus.useAutofill === null) {
            const useAutofill = await browserSupportsWebAuthnAutofill()
            setAppUserStatus({
                ...appUserStatus,
                useAutofill: useAutofill,
            })
            return useAutofill
        }
        return appUserStatus.useAutofill
    }

    useEffect(() => {
        testBrowserAutofill()
    })
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
                    className.push(popStyles.PopInline)
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
                {appUserStatus.useAutofill ? (
                    <input
                        type="text"
                        name="username"
                        autoFocus
                        className={popStyles.LoginInput}
                        placeholder={'选择 PassKey'}
                        autoComplete="webauthn"
                    />
                ) : (
                    <SlugButtons
                        className={popStyles.RegisterInput}
                        onClick={() => {
                            startUserAuthentication(
                                false,
                                () => {},
                                () => {}
                            )
                        }}
                    >
                        登录
                    </SlugButtons>
                )}

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
        switch (appUserStatus.status) {
            case AuthenticateStatus.SUCCESSFUL:
                return <UserProfileCapsule />
            case AuthenticateStatus.UNINITIALIZED:
                return <AskForRegistration cancel={handleCancelRegisteration} />
            case AuthenticateStatus.REGISTERED:
                return <h3>Already Registered</h3>
            default:
                return <></>
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
            case 'present':
                return <h3>user</h3>
        }
    }

    return (
        <div
            className={getWrapperClassName()}
            onClick={() => {
                if (userWindowActivation === 'invisible') {
                    setUserWindowActivation('pop')
                    if (appUserStatus.useAutofill) {
                        startUserAuthentication(
                            true,
                            () => {},
                            () => {}
                        )
                    }
                }
            }}
        >
            {switcher()}
        </div>
    )
}
