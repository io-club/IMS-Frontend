import { AuthenticateStatus, authenticateStatusState } from './index'
import { useAtom } from 'jotai/react/useAtom'

export const useClearAuth = () => {
    let [authenticateStatus, setAuthenticateStatus] = useAtom(
        authenticateStatusState
    )

    if (authenticateStatus === AuthenticateStatus.UNINITIALIZED) {
        return
    }
    if (authenticateStatus === AuthenticateStatus.FAILED) {
        setAuthenticateStatus(AuthenticateStatus.UNINITIALIZED)
        return;
    }
}
