import '../styles/globals.css'
import { Provider } from "react-redux"
import { store } from "../app/redux"
import "../styles/index.scss"
import MainLayout from "../components/MainLayout/MainLayout"


function MyApp({ Component, pageProps }) {
  return <Provider store={store}><MainLayout><Component {...pageProps} /></MainLayout></Provider>
}

export default MyApp
