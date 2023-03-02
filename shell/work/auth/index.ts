import { atom } from 'jotai'
import { registerUser } from './begin'

export type AuthenticateStatus =
    | 'uninitialized'
    | 'successful'
    | 'failed'
    | 'registered'

const lockedForRegistration = (status: AuthenticateStatus): boolean => {
    const lockStatus: AuthenticateStatus[] = ['successful', 'registered']
    return lockStatus.includes(status)
}

const authenticateStatusState = atom<AuthenticateStatus>('uninitialized')

export { authenticateStatusState, lockedForRegistration, registerUser }
