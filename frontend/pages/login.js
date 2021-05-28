import Head from 'next/head'
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {signIn, useSession} from 'next-auth/client'
import Layout from "../components/layout";


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [session, loading] = useSession()

    const handleLogin = async (event) => {
        event.preventDefault()
        await signIn('credentials', {
                email,
                password,
                callbackUrl: 'http://localhost:3000'
            }
        )
        await router.push('/')
    }
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className="row">
                <div className="col-sm-6">
                    <div>
                        <a href="#" onClick={() => signIn('google')}>
                            <Image
                                src="/images/google.png" // Route of the image file
                                height={50} // Desired size with correct aspect ratio
                                width={230} // Desired size with correct aspect ratio
                                alt="Sign In with Google"
                            />
                        </a>
                    </div>
                    <div className="separator">OR</div>
                    <h4> Log in with Email</h4>
                    <form onSubmit={handleLogin} method="post">
                        <div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <br/>
                    <p>Don't have an account? <Link href="/signup"><a>Sign up.</a></Link></p>
                    <p><Link href="/forgot"><a>Forgot Password?</a></Link></p>
                </div>
            </div>
            <style jsx>{`
              .separator {
                display: flex;
                align-items: center;
                text-align: center;
                margin-top: 30px;
                margin-bottom: 30px;
              }

              .separator::before,
              .separator::after {
                content: '';
                flex: 1;
                border-bottom: 1px solid #000;
              }

              .separator:not(:empty)::before {
                margin-right: .25em;
              }

              .separator:not(:empty)::after {
                margin-left: .25em;
              }
            `}</style>
        </Layout>
    )
}


