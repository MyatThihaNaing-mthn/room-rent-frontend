import getJwtToken from "./TokenUtils"

export const getAuthConfig = async() => {
    const accessToken = await getJwtToken()
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return config
}
