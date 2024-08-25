import Header from "./layouts/header"
import Footer from "./layouts/footer"
import { Outlet } from "react-router-dom"

const App = () => {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
