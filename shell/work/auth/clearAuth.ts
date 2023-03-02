import { authenticateStatusState } from './index'
import { useAtom } from 'jotai/react/useAtom'

export const useClearAuth = () => {
    let [authenticateStatus, setAuthenticateStatus] = useAtom(
        authenticateStatusState
    )

    if (authenticateStatus === 'uninitialized') {
        return
    }
    if (authenticateStatus === 'failed') {
        setAuthenticateStatus('uninitialized')
        return;
    }
}
