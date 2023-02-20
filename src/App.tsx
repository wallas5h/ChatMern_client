import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Navigation } from "./components";
import { socket } from "./features/appSlice";
import { RootState } from "./features/store";
import { Routing } from "./Routing";

const App = () => {
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user.id) {
      socket.on("connect", () => {});
    }
  }, []);
  return (
    <>
      <Navigation />
      <Routing />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
