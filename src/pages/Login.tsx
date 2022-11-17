import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    SetFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
            create one
          </a>
        </p>
      </form>
    </div>
  );
}
