import axios from "axios";

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
                'Authorization': `Bearer ${accessToken}`,
                //'Content-Type': 'multipart/form-data'
            }
        })
        return await res
    } catch (error) {
        return error.response
    }
}

export async function getFreelanceCompanies() {
    await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_HOST}/api/fcompany/`,
    })
}

export async function getFreelanceCategories(accessToken, data, data2, data3) {
    await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_HOST}/api/fcategory/`,
    })
}

export async function addCompany(accessToken, data, data2) {
    try {
        const res = await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_HOST}/api/fcompany/`,
            data: data,
        }).then(r => {
            axios({
                method: "post",
                url: `${process.env.NEXT_PUBLIC_HOST}/api/freelance/`,
                data: {...data2, ...{company: r.data.id}},
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        })
        return await res
    } catch (error) {
        return error.response
    }
}

export async function addCategory(accessToken, data, data2, data3) {
    try {
        const res = await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_HOST}/api/fcategory/`,
            data: data,
        }).then(r => {
            axios({
                method: "post",
                url: `${process.env.NEXT_PUBLIC_HOST}/api/fcompany/`,
                data: {...data2, ...{category: r.data.id}},
            }).then(c => {
                axios({
                    method: "post",
                    url: `${process.env.NEXT_PUBLIC_HOST}/api/freelance/`,
                    data: {...data3, ...{category: c.data.category, company: c.data.id}},
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            })
        })
        return await res
    } catch (error) {
        return error.response
    }
}
