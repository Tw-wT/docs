import '../styles/globals.css'
import { Provider } from "react-redux"
import { store } from "../app/store"
import "../styles/index.scss"
import MainLayout from "../app/components/MainLayout/MainLayout"
import { Configuration } from "@react-md/layout"

function MyApp({ Component, pageProps }) {
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
