import { startAuthentication } from '@simplewebauthn/browser'

export const initAuthentication = () => {
    const mockOptions = {
        allowCredentials: [],
        challenge: 'uxRECK-K0I6SU1kGWiQM8PyXI2GqVm_8LyurUbE9hbM',
        rpId: 'localhost',
        timeout: 60000,
        userVerification: 'required',
    }
    startAuthentication(mockOptions, true)
        .then( r => {
            console.log('goodOne')
        })
}
export const loginUser = async () => {
    fetch(`/api/auth/register/begin/User}`).then(async (response) => {
        // Note the `true` argument here
        const options = (await response.json())['opptions']
        startAuthentication(options, true)
            // .then((authResp) => sendToServerForVerificationAndLogin)
            // .catch((err) => handleError)
            .then(() => {
                console.log('hello')
                console.log(options)
            })
    })
}
