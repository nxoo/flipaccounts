import axios from "axios";
import {error} from "next/dist/build/output/log";

export async function getHostJWT(data) {
    try {
        const res = await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_HOST}/rest-auth/login/`,
            data: data,
        })
        return await res
    } catch (error) {
        return error.response
    }
}

export async function signInWithGoogle(data) {
    try {
        const res = await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_HOST}/rest-auth/google/`,
            data: data,
        })
        return await res
    } catch (error) {
        return error.response
    }
}

export async function signUp(data) {
    try {
        const res = await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_HOST}/rest-auth/register/`,
            data: data,
        })
        return await res
    } catch (error) {
        return error.response
    }
}


export async function addFreelance(accessToken, data) {
    try {
        const res = await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_HOST}/api/freelance/`,
            data: data,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return await res
    } catch (error) {
        return error.response
    }
}
