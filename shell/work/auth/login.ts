import { startAuthentication } from '@simplewebauthn/browser'

export const initAuthentication = async (useAutofill = false) => {
    let response = await fetch(`/api/v1/auth/login/begin`)
    const options = (await response.json())['options']
    const authResp = await startAuthentication(options.publicKey, useAutofill)
    response = await fetch(`/api/v1/auth/login/finish`, {
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
}
