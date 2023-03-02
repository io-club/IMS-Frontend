'use client'

import { startRegistration } from '@simplewebauthn/browser'
import { AuthenticateStatus, authenticateStatusState } from './index'
import { trim } from '../strings'

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
    let response = await fetch(`/api/auth/register/begin/${username}`)
    console.log(response)

    let attResp
    let baseID
    try {
        // Pass the options to the authenticator and wait for a response
        const fetchedResponse = await response.json()
        if (fetchedResponse['failed']) {
            console.log(fetchedResponse['msg'])
            setAuthenticateStatus('registered')
        }
        attResp = await startRegistration(
            fetchedResponse['options']['publicKey']
        )
        baseID = await fetchedResponse['options']['publicKey']['user']['id']
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

    console.log('before trimming', baseID)
    console.log('after  trimming', trim(baseID))

    // POST the response to the endpoint that calls
    // @simplewebauthn/server -> verifyRegistrationResponse()
    const verificationResp = await fetch(
        `/api/auth/register/finish/${trim(baseID)}`,
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
        setAuthenticateStatus('successful')
        console.log(attResp)
        setFeedbackMessage(
            `Hello ${JSON.stringify(attResp['id'])}
                `
        )
    } else {
        setAuthenticateStatus('failed')
        setFeedbackMessage(
            `Oh no, something went wrong! ${JSON.stringify(
                verificationJSON['msg']
            )}`
        )
    }
}
