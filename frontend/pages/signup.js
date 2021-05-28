import Head from 'next/head'
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {signIn, useSession} from 'next-auth/client'
import Layout from "../components/layout";
import {signUp} from "../lib/flip";


function Alert({message, type, error}) {
    return (
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
            {message} <strong>!</strong>
            <button onClick={event => error(false)} type="button" className="btn-close" data-bs-dismiss="alert"
                    aria-label="Close"></button>
        </div>
    )
}


export default function Signup() {
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    const [showError, setshowError] = useState('')
    const router = useRouter()
    const [session, loading] = useSession()

    const handleLogin = async event => {
        event.preventDefault()
        const data = {email, password1, password2}
        if (password1 !== password2) {
            setshowError(true)
            setError("Passwords didn't match")
        } else if (password1 === password2 && password1.length < 8) {
            setshowError(true)
            setError("Password length can't be less than 8")
        } else {
            const res = await signUp(data)
            if (res.status === 201) {
                await signIn('credentials', {
                        email: res.data.user.email,
                        password: password1,
                        callbackUrl: 'http://localhost:3000'
                    }
                )
            } else if (res.status === 400) {
                setError(res)
                console.log(res)
            }
            return res.data
        }
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className="row">
                <div className="col-sm-6">
                    {showError ?
                        <Alert message={error} type="warning" error={setshowError}/>
                        : null}
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
                    <h4>Sign up with Email</h4>
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
                                    name="password1"
                                    className="form-control"
                                    id="password1"
                                    placeholder="Password"
                                    value={password1}
                                    onChange={e => setPassword1(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="password2"
                                    className="form-control"
                                    id="password2"
                                    placeholder="Confirm password"
                                    value={password2}
                                    onChange={e => setPassword2(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </form>
                    <br/>
                    <p>Already have an account? <Link href="/login"><a>Login</a></Link></p>
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


