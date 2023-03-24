'use client'

import { startRegistration } from '@simplewebauthn/browser'
import { AuthenticateStatus } from './index'

export const registerUser = async (
    username: string,
    setAuthenticateStatus: (s: AuthenticateStatus) => void,
    setFeedbackMessage: (s: string) => void
) => {
    if (username.length === 0) {
        console.log('username needed')
        setFeedbackMessage('Please provide username')
        return
    }
    let response = await fetch(`/api/v1/auth/register/begin/${username}`)
    let attResp
    let userID
    try {
        // Pass the options to the authenticator and wait for a response
        const fetchedResponse = await response.json()
        if (fetchedResponse['failed']) {
            console.log(fetchedResponse['msg'])
            setAuthenticateStatus(AuthenticateStatus.REGISTERED)
        }
        attResp = await startRegistration(
            fetchedResponse['options']['publicKey']
        )
        userID = await fetchedResponse['user']['id']
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
    // @simplewebauthn/server -> verifyRegistrationResponse()
    const verificationResp = await fetch(
        `/api/v1/auth/register/finish/${userID}`,
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
