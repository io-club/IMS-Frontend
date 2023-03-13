import { startAuthentication } from '@simplewebauthn/browser'

export const initAuthentication = () => {
    // const mockOptions = {
    //     allowCredentials: [],
    //     challenge: 'uxRECK-K0I6SU1kGWiQM8PyXI2GqVm_8LyurUbE9hbM',
    //     rpId: 'localhost',
    //     timeout: 60000,
    //     userVerification: 'required',
    // }
    // startAuthentication(mockOptions, true)
    //     .then(r => {
    //         console.log('goodOne')
    //     })
}

export const loginUser = async () => {
    let response = await fetch(`/api/v1/auth/login/begin`)
    const options = (await response.json())['options']
    console.log("options: ", options);
    const authResp = await startAuthentication(options.publicKey, false)
    console.log(authResp);
    response = await fetch(`/api/v1/auth/login/finish`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: `{"aaa": 1, "bbb": 2, "ccc": [1, 2, 3, 4]}`,
        // body: JSON.stringify(authResp)
        // export interface AuthenticationResponseJSON {
        //     id: Base64URLString;
        //     rawId: Base64URLString;
        //     response: AuthenticatorAssertionResponseJSON;
        //     authenticatorAttachment?: AuthenticatorAttachment;
        //     clientExtensionResults: AuthenticationExtensionsClientOutputs;
        //     type: PublicKeyCredentialType;
        // }
        body: JSON.stringify({
            // {"authenticatorAttachment":"cross-platform","clientExtensionResults":{},"id":"lODJUO8tw0gvVotTnfqQ_A","rawId":"lODJUO8tw0gvVotTnfqQ_A","response":{"authenticatorData":"SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2MdAAAAAA","clientDataJSON":"eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiNjVmWWNRN2NfLWFzTG5aZVJGU0phRlNaMUR1cWctek5RMEZNQjZlSWY4MCIsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImNyb3NzT3JpZ2luIjpmYWxzZX0","signature":"MEYCIQDZw0OT-bkEbJG-gD84fPHxgSLvYHUBvpiIMwqB6vOpqgIhAJeMQ3cQCSZ8_YjwvLHxaGEy5Ds8F_UAAYqsA5eE_svc","userHandle":"GAAAAAAAAAAAAA=="},"type":"public-key"}
            // {
            //     "id": "lODJUO8tw0gvVotTnfqQ_A",
            //     "type": "",
            //     "rawId": "lODJUO8tw0gvVotTnfqQ_A",
            //     "response": {
            //       "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiNjVmWWNRN2NfLWFzTG5aZVJGU0phRlNaMUR1cWctek5RMEZNQjZlSWY4MCIsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImNyb3NzT3JpZ2luIjpmYWxzZX0",
            //       "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2MdAAAAAA",
            //       "signature": "MEYCIQDZw0OT-bkEbJG-gD84fPHxgSLvYHUBvpiIMwqB6vOpqgIhAJeMQ3cQCSZ8_YjwvLHxaGEy5Ds8F_UAAYqsA5eE_svc"
            //     }
            //   }
            id: authResp.id,
            type: authResp.type,
            rawId: authResp.rawId,
            response: {
                ...authResp.response,
                userHandle: authResp.response.userHandle.slice(undefined, -2)
            }
        })
    })
    // console.log(await response2.json())
}

// {
//     "id": "lODJUO8tw0gvVotTnfqQ_A",
//     "rawId": "lODJUO8tw0gvVotTnfqQ_A",
//     "response": {
//         "authenticatorData": "SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2MdAAAAAA",
//         "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiZjk4djVSaGluWHNRZjFkeFhkYndBYU85b3ZxdGZHOHQ3M3Zmd1hRNFRHUSIsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImNyb3NzT3JpZ2luIjpmYWxzZX0",
//         "signature": "MEYCIQDN0nVAy2-8EeMxuckKp7wJf5CZ65SrqiJzHcnThePFnwIhAK5fF197_BXhwOsDlMgyPCY06l8B7omMscLnpTC4OfxG",
//         "userHandle": "GAAAAAAAAAAAAA=="
//     },
//     "type": "public-key",
//     "clientExtensionResults": {},
//     "authenticatorAttachment": "cross-platform"
// }

// {
//     "username": "",
//     "response": {
//         "id": "NwKjMismmfWreV4lmdbbCw",
//         "rawId": "NwKjMismmfWreV4lmdbbCw",
//         "response": {
//             "authenticatorData": "dKbqkhPJnC90siSSsyDPQCYqlMGpUKA5fyklC2CEHvAdAAAAAA",
//             "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiX3ZXRjBUQmNTWnFreFdGdkl0VzJXUDNZajIxbVlPRTdMZnN6ZnIzNV81MVFGcGJleEVLVHF3RFlHTWJwa20zMmlqS1prZlFndVFKdW44cnlxNXZLT0EiLCJvcmlnaW4iOiJodHRwczovL3dlYmF1dGhuLmlvIiwiY3Jvc3NPcmlnaW4iOmZhbHNlfQ",
//             "signature": "MEQCIEwlLnI1dXZEhyskFaDwHZ5m59Fe_r1ygkPy6Tv1iclDAiANFyQcx3hqmgJzPTI4uIi3gDFrRgSF1e09WAXabk6KSw",
//             "userHandle": "d2FmZXJld2FzZGFkd2Fm"
//         },
//         "type": "public-key",
//         "clientExtensionResults": {},
//         "authenticatorAttachment": "cross-platform"
//     }
// }