import { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useSignupUserMutation } from "../services/usersApi";
import "./signup.scss";

const imgUrl =
  "https://images.pexels.com/photos/8294606/pexels-photo-8294606.jpeg?auto=compress&cs=tinysrgb&w=640&h=427&dpr=1";

export default function Signup() {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  //image upload states
  const [uploadingImg, setUploadImg] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const { image, name, email, password, confirm_password } = formData;
  const navigate = useNavigate();
  const [signupUser, { isLoading, error }] = useSignupUserMutation();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateImg = (e: ChangeEvent<HTMLInputElement>) => {
    let file: any;
    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0];
    }

    if (file === undefined || null) return;

    if (file.size > 1048576) {
      return alert("Max file size is 1MB");
    } else {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      setImagePreview(URL.createObjectURL(file));
    }
  };

  async function uploadImage(image: any) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "enelcoff");
    try {
      setUploadImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dkdynfku8/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const urlData = await res.json();
      setUploadImg(false);
      return urlData.url;
    } catch (error) {
      setUploadImg(false);
      console.log(error);
    }
  }

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!image) return alert("Please upload your picture");
    const imageUploadUrl = await uploadImage(image);
    console.log(imageUploadUrl);

    if (password !== confirm_password) return alert("Passwords not match");

    try {
      await signupUser({ name, email, password, image: imageUploadUrl }).then(
        (data: any) => {
          console.log(data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen items-center">
      <form onSubmit={formSubmit} className="p-4 rounded-lg m-auto bg-white">
        <h1 className="text-center text-2xl">Signup</h1>
        <div className="my-5">
          <img
            src={imagePreview ? imagePreview : imgUrl}
            alt="image"
            className="w-[100px] h-[100px] rounded-full m-auto"
          />
          <label
            htmlFor="image-upload"
            className="text-green-600 cursor-pointer m-auto"
          >
            <AiOutlinePlusCircle size={40} />
          </label>
          <input
            className="p-2 rounded w-full border"
            type="file"
            id="image-upload"
            name="image"
            hidden
            accept="image/png, image/jpeg"
            onChange={validateImg}
          />
        </div>
        <div className="my-5">
          <label>Name</label>
          <input
            className="p-2 rounded w-full border"
            type="text"
            id="name"
            name="name"
            placeholder="Enter email"
            required
            value={name}
            onChange={change}
          />
        </div>
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
        <div className="my-5">
          <label>Confirm</label>
          <input
            type="password"
            name="confirm_password"
            className="p-2 rounded w-full border"
            placeholder="Confirm password"
            required
            value={confirm_password}
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
          Already have an account?{" "}
          <a href="/login" className="text-green-500">
            {uploadingImg ? "Signing you up..." : "Signup"}
          </a>
        </p>
      </form>
      <div className="signup__bg ">
        <img
          src="https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=640&h=960&dpr=1"
          alt=""
          className="h-[80vh]"
        />
      </div>
    </div>
  );
}
