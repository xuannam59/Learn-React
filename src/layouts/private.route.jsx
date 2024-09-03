import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";


const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);

  if (user && user.id) {
    return (
      <>
        {props.children}
      </>
    );
  }

  return (
    <>
      <Result
        status="403"
        title="UnAuthorize"
        subTitle="You need to log in to access this resource!"
        extra={<Button type="primary">
          <Link to={"/"}>Back to homepage</Link>
        </Button>}
      />
    </>
  );
}

export default PrivateRoute;