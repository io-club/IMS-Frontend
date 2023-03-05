import { atom } from 'jotai'
import { registerUser, loginUser } from './begin'


export enum AuthenticateStatus {
    UNINITIALIZED,
    FAILED,
    REGISTERED,
    SUCCESSFUL,
    LOGGEDIN
}

const lockedForRegistration = (status: AuthenticateStatus): boolean => {
    const lockStatus: AuthenticateStatus[] = [
        AuthenticateStatus.SUCCESSFUL,
        AuthenticateStatus.REGISTERED,
        AuthenticateStatus.LOGGEDIN
    ]
    return lockStatus.includes(status)
}

const authenticateStatusState = atom<AuthenticateStatus>(AuthenticateStatus.UNINITIALIZED)

export { authenticateStatusState, lockedForRegistration, registerUser, loginUser }
