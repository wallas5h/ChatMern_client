export const Navigation = () => {
  return (
    <div className="flex justify-between items-center w-screen h-10 bg-green-600 px-10 text-white">
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
        <a className="px-5 hover:bg-cyan-300 py-2" href="/login">
          Login
        </a>
        <a className="px-5 hover:bg-cyan-300 py-2" href="/signup">
          Signup
        </a>
      </div>
    </div>
  );
};
