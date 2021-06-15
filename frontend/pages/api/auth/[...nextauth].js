import NextAuth from 'next-auth'
import {GetUserError} from "next-auth/errors";
import Providers from 'next-auth/providers'
import {getHostJWT, signInWithGoogle} from "../../../lib/flip";

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
                const res = await getHostJWT(data)
                if (res) {
                    if (res.status === 200) {
                        return Promise.resolve(res.data)
                    } else {
                        return Promise.reject(new Error(res.status))
                    }
                } else {
                    return Promise.reject(new Error("504"))
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
                        return Promise.resolve(user);
                    } else {
                        return Promise.reject(new Error('google'));
                    }
                } catch (error) {
                    if (error.response) {
                        return Promise.reject(new Error('google'));
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

