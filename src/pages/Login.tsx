import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {} from "socket.io-client";
import { socket } from "../features/appSlice";
import { RootState } from "../features/store";
// import { socket } from "../contexts/AppContext";
import { useLoginUserMutation } from "../services/usersApi";

export const Login = () => {
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const { rooms } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    // console.log(rooms);
  }, []);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    SetFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
      }).then(({ data }: any) => {
        if (!data) {
          toast.error("Login failed, try again");
          return;
        }
        if (data.message) {
          toast.success(data.message);
        }
        navigate("/chat");
        socket.emit("new-user");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="signup__bg ">
        <img
          src="https://images.pexels.com/photos/1181742/pexels-photo-1181742.jpeg?auto=compress&cs=tinysrgb&w=640&h=960&dpr=1"
          alt=""
          className="h-[80vh]"
        />
      </div>
      <form onSubmit={formSubmit} className="p-4 rounded-lg  m-auto">
        <h1 className="text-center text-2xl">Login</h1>
        <div className="my-5">
          <label>Email</label>
          <input
            className="p-2 rounded w-full border"
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            required
            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
            value={email}
            onChange={change}
          />
        </div>
        <div className="my-5">
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-2 rounded w-full border"
            placeholder="Enter password"
            required
            value={password}
            onChange={change}
          />
        </div>
        <button
          type="submit"
          className="p-2 w-full bg-green-600 text-white rounded hover:bg-green-500 cursor-pointer"
        >
          Submit
        </button>
        <p className="py-2 pt-4 text-slate-600">
          Forget password ?{" "}
          <a href="/login/reset" className="text-green-500">
            click here
          </a>
        </p>
        <p className="py-2 text-slate-600">
          Don't have an account ?{" "}
          <a href="/signup" className="text-green-500">
            Sign up!
          </a>
        </p>
      </form>
    </div>
  );
};
