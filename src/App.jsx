import Header from "./layouts/header"
import Footer from "./layouts/footer"
import { Outlet } from "react-router-dom"
import { getAccountApi } from "./services/api.service"
import { useContext, useEffect } from "react"
import { AuthContext } from "./components/context/auth.context"

const App = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, [])

  const fetchUserInfo = async () => {
    const res = await getAccountApi();

    if (res.data) {
      setUser(res.data.user);
    }
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
