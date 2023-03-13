import { atom } from 'jotai'
import { registerUser } from './begin'
import { startUserAuthentication } from './auth'

export enum AuthenticateStatus {
    UNINITIALIZED,
    FAILED,
    REGISTERED,
    SUCCESSFUL,
    LOGGEDIN,
}

export interface UserStorage {
    username: string
    avatarURL: string
    sesssion: string
}

export interface AppUserStorage {
    status: AuthenticateStatus
    user: UserStorage | null
    useAutofill: boolean | null
}

const lockedForRegistration = (status: AuthenticateStatus): boolean => {
    const lockStatus: AuthenticateStatus[] = [
        AuthenticateStatus.SUCCESSFUL,
        AuthenticateStatus.REGISTERED,
        AuthenticateStatus.LOGGEDIN,
    ]
    return lockStatus.includes(status)
}

const appUserStorageState = atom<AppUserStorage>({
    status: AuthenticateStatus.UNINITIALIZED,
    user: null,
    useAutofill: null
})

export {
    appUserStorageState,
    lockedForRegistration,
    registerUser,
    startUserAuthentication,
}
