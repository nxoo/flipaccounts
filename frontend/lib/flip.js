import axios from "axios";
import {ca} from "date-fns/locale";


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

export async function signInWithGoogle(data) {
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

export async function signUp(data) {
    try {
        const res = await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_HOST}/rest-auth/register/`,
            data: data,
        })
        return res
        console.log(res)
    } catch (error){
        return error
    }
}
