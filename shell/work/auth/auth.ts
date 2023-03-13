import { AuthenticateStatus } from './index'
import { startAuthentication } from '@simplewebauthn/browser'

export const startUserAuthentication = async (
    setAuthenticateStatus: (s: AuthenticateStatus) => void,
    setFeedbackMessage: (s: string) => void
) => {
    let response = await fetch(`/api/v1/auth/login/begin`)
    let attResp
    let userID
    try {
        const fetchedResponse = await response.json()
        console.log(fetchedResponse)
        if (fetchedResponse['failed']) {
            console.log(fetchedResponse['msg'])
            setAuthenticateStatus(AuthenticateStatus.FAILED)
        }
        attResp = await startAuthentication(fetchedResponse, true)
        userID = fetchedResponse['user']['id']
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

    // POST the response to the endpoint that calls
    // @simplewebauthn/server -> verifyAuthenticationResponse()
    console.log(attResp)
    const verificationResp = await fetch(
        `/api/v1/auth/login/finish/${userID}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attResp),
        }
    )

    // Wait for the results of verification
    const verificationJSON = await verificationResp.json()

    // Show UI appropriate for the `verified` status
    if (verificationJSON && verificationJSON.verified) {
        setAuthenticateStatus(AuthenticateStatus.SUCCESSFUL)
        console.log(attResp)
        setFeedbackMessage(
            `Hello ${JSON.stringify(attResp['id'])}
                `
        )
    } else {
        setAuthenticateStatus(AuthenticateStatus.FAILED)
        setFeedbackMessage(
            `Oh no, something went wrong! ${JSON.stringify(
                verificationJSON['msg']
            )}`
        )
    }
}
