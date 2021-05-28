import axios from "axios";


export async function getHostAccessToken(data) {
    try {
        const res = await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_HOST}/rest-auth/login/`,
            data: data,
        })
        return res.data
    } catch (error) {
        return null
    }
}

export async function loginWithGoogle(data) {
    try {
        const res = await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_HOST}/rest-auth/google/`,
            data: data,
        })
        return res.data
    } catch (error) {
        return null
    }
}