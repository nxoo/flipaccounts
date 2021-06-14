import NextAuth from 'next-auth'
import {GetUserError} from "next-auth/errors";
import Providers from 'next-auth/providers'
import {getHostAccessToken, signInWithGoogle} from "../../../lib/flip";

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        Providers.Credentials({
            name: 'credentials',
            credentials: {
                email: {label: "Email", type: "email", placeholder: "email@example.com"},
                password: {label: "Password", type: "password", placeholder: "password"}
            },
            async authorize(credentials, req) {
                const data = {email: credentials.email, password: credentials.password}
                const res = await getHostAccessToken(data)
                if (res) {
                    if (res.status === 200) {
                        return res.data
                    } else if (res.status === 400) {
                        return null
                    }
                } else {
                    return null
                }
            }
        })
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    session: {
        jwt: true,
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        encryption: true,
        secret: process.env.NEXT_PUBLIC_JWT_SECRET,
        signingKey: process.env.NEXT_PUBLIC_JWT_SIGNING_KEY,
        encryptionKey: process.env.NEXT_PUBLIC_JWT_ENCRYPTION_KEY,
    },
    pages: {
        // signIn: '/auth/signin',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        error: '/login', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },
    callbacks: {
        async signIn(user, account, profile) {
            if (account.provider === "google") {
                const {accessToken, idToken} = account;
                const data = {access_token: accessToken, code: "", id_token: idToken}
                try {
                    const res = await signInWithGoogle(data)
                    if (res) {
                        user.access_token = res.data.access_token
                        user.refresh_token = res.data.refresh_token
                        user.user = res.data.user
                        console.log(user)
                        return Promise.resolve(user);
                    }
                    return true
                } catch (error) {
                    if (error.response) {
                        console.log('errrrr', error.response);
                        return Promise.reject(new Error('Invalid Username  and Password combination'));
                    }
                }
            }
        },
        async jwt(token, user) {
            if (user) {
                token = {
                    accessToken: user.access_token,
                    refreshToken: user.refresh_token,
                    user: user.user
                }
            }
            return token
        },
        async session(session, token, user) {
            session = {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                user: token.user
            }
            return session
        },
        // async redirect(url, baseUrl) { return baseUrl },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: false,
})

