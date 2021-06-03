import Head from 'next/head'
import Link from "next/link";
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {signIn, useSession} from 'next-auth/client'
import Layout from "../components/layout";
import googleButton from '../styles/google.module.css'


function Alert({message, type}) {
    return (
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
            {`Wrong! ${message}`}
            <button onClick={()=>{null}} type="button" className="btn-close" data-bs-dismiss="alert"
                    aria-label="Close"/>
        </div>
    )
}

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState('')
    const [session, loading] = useSession()
    const router = useRouter()
    const {error} = router.query

    useEffect(() => {
        if(error){
            setErrorMessage(error)
            setShowError(true)
        }
        if(session) {
            router.push('/')
        }
    })

    const handleLogin = async (event) => {
        event.preventDefault()
        const res = await signIn('credentials', {email, password, callbackUrl: `${process.env.NEXTAUTH_URL}/login`})
        if(res) {
            await router.push('/')
        }
    }
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className="row">
                <div className="col-sm-6">
                    <a href="#" onClick={() => signIn('google')}>
                        <div className={googleButton.btn}>
                            <div className={googleButton.wrapper}>
                                <img
                                    src="/images/google.svg"
                                    alt="Sign In with Google"
                                    className={googleButton.icon}
                                />
                            </div>
                            <p className={googleButton.text}><b>Log in with Google</b></p>
                        </div>
                    </a>
                    <div className="separator">OR</div>
                    {showError ? <Alert message={errorMessage} type={'warning'}/> : null}
                    <h4>Log in with Email</h4>
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


