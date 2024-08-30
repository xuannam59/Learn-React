import { useEffect, useState } from "react";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserApi } from "../services/api.service";

const UserPage = () => {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    loadUser()
  }, []);
  const loadUser = async () => {
    const res = await fetchAllUserApi();
    setDataUsers(res.data);
  }
  return (
    <div>
      <div style={{ padding: "20px" }} >
        <UserForm loadUser={loadUser} />
        <UserTable
          dataUsers={dataUsers}
          loadUser={loadUser}
        />
      </div>
    </div >
  );
}

export default UserPage;