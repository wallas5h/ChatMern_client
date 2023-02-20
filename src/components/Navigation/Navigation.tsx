import { useEffect } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { clearUserData } from "../../features/userSlice";
import { useLogoutUserMutation } from "../../services/usersApi";

export const Navigation = () => {
  const user = useSelector((state: RootState) => state.user);
  const [logoutUser, { isLoading, error }] = useLogoutUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(user);
  }, []);

  const handleLogout = async () => {
    // e.preventDefault();
    try {
      dispatch(clearUserData());
      await logoutUser(user);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center w-screen h-10 bg-green-600 px-10 ">
      <div className="logo">
        {" "}
        <a className="px-5 hover:bg-cyan-300 py-2" href="/">
          Home
        </a>
      </div>
      <div className="links flex justify-around ml-auto">
        <a className="px-5 hover:bg-cyan-300 py-2" href="/chat">
          Chat
        </a>
        {!user.id && (
          <a className="px-5 hover:bg-cyan-300 py-2" href="/login">
            Login
          </a>
        )}
        {user.id && (
          <div className="flex flex-row justify-center items-center">
            <NavDropdown
              title={
                <>
                  <img
                    src={user.image}
                    alt="user"
                    className="w-[30px] h-[30px] mr-[10px] object-cover rounded-full"
                  />
                  {user.name}
                </>
              }
            >
              <NavDropdown.Item className="bg-green-600" href="">
                Action
              </NavDropdown.Item>
              <NavDropdown.Item className="bg-green-600" href="">
                <Button variant="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        )}
      </div>
    </div>
  );
};
