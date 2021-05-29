import { Provider } from 'next-auth/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/google.scss'

export default function App({Component, pageProps}) {
    return (
        <Provider>
            <Component {...pageProps} />
        </Provider>
    )
}

if (typeof window !== "undefined") {
    require("bootstrap/dist/js/bootstrap.bundle.min");
}