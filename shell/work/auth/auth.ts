import { AuthenticateStatus } from './index'
import { startAuthentication } from '@simplewebauthn/browser'

export const startUserAuthentication = async (
    useAutofill = false,
    setAuthenticateStatus: (s: AuthenticateStatus) => void,
    setFeedbackMessage: (s: string) => void
) => {
    try {
        // fetch options and initialize
        let response = await fetch(`/api/v1/auth/login/begin`)
        const options = (await response.json())['options']
        const authResp = await startAuthentication(options.publicKey, useAutofill)
        
        // start login
        const verificationResp = await fetch(`/api/v1/auth/login/finish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: authResp.id,
                type: authResp.type,
                rawId: authResp.rawId,
                response: {
                    ...authResp.response,
                    userHandle: authResp.response.userHandle.slice(undefined, -2)
                }
            })
        })
        
        // finalize
        const verificationJSON = await verificationResp.json()
    
        // Show UI appropriate for the `verified` status
        if (verificationJSON && verificationJSON.verified) {
            setAuthenticateStatus(AuthenticateStatus.SUCCESSFUL)
            setFeedbackMessage(
                `Hello`
            )
        } else {
            setAuthenticateStatus(AuthenticateStatus.FAILED)
            setFeedbackMessage(
                `Oh no, something went wrong! ${JSON.stringify(
                    verificationJSON['msg']
                )}`
            )
        }
    } catch (error) {
        // Some basic error handling
        if (error instanceof Error) {
            setFeedbackMessage(error.message)
            switch (error.name) {
                case 'InvalidStateError':
                    console.log(
                        'Error: Authenticator was probably already registered by user'
                    )
                    break
                case 'NotAllowedError':
                    console.log('Error: Authentication cancelled')
                    break
                default:
                    console.log(error.message)
                    break
            }
        } else {
            console.log(error)
        }
        throw error
    }
}
