import '../styles/globals.css'
import "primeicons/primeicons.css"
import { Provider } from "react-redux"
import { store } from "../app/store"
import "../styles/index.scss"
import MainLayout from "../app/components/MainLayout/MainLayout"
import { Configuration } from "@react-md/layout"
import { injectStore } from "../app/store/axios/instance"

function MyApp({ Component, pageProps }) {
  //inject store in axios
  injectStore(store)

  return (
    <Provider store={store}>
      <MainLayout>
        <Configuration>
          <Component {...pageProps} />
        </Configuration>
      </MainLayout>
    </Provider>
  )
}

export default MyApp
