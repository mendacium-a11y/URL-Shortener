import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Login() {
  // USESTATE TO HANDLE LOGIN ERRORS-
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    // CHECKING FOR EMPTY FIELDS
    if (username && password) {
      setError("");
    } else {
      setError("Please fill all the fields");
    }
  };

  return (
    <>
      <Navbar />
      <div className="absolute -z-50 inset-0 text-white h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] flex justify-center items-center"></div>
      <div className="flex justify-center items-center h-[80vh] text-white p-5">
        <div className="lg:w-[40vw] rounded-3xl shadow-sm shadow-white p-6 flex justify-center items-center flex-col">
          {/* HEADING SECTION */}
          <div className="top text-center">
            <h1 className="text-5xl bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent font-old">
              Welcome Back!
            </h1>
            <p className="text-slate-400 text-lg">Please signin to continue</p>
          </div>

          {/* FORM FOR LOGIN */}
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="w-full mt-8 flex flex-col gap-5 font-exo"
          >
            <div className="formElements w-full flex flex-col gap-5">
              <input
                type="text"
                placeholder="USERNAME"
                name="username"
                className="w-full text-gray-100 rounded-lg px-4 py-3 bg-gray-800/50 border border-gray-700/50 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition duration-300 placeholder:text-gray-400 placeholder:tracking-widest text-xl font-medium"
              />

              <input
                type="password"
                placeholder="PASSWORD"
                name="password"
                className="w-full text-gray-100 rounded-lg px-4 py-3 bg-gray-800/50 border border-gray-700/50 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition duration-300 placeholder:text-gray-400 placeholder:tracking-widest text-xl font-medium"
              />
            </div>

            <div className="bottom w-full flex flex-col gap-2 mt-5">
              <button className="text-2xl tracking-wider font-medium p-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition duration-300 shadow-lg hover:shadow-violet-500/25">
                LOGIN
              </button>
              {error && (
                <p className="text-red-400 text-lg text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                  {error}
                </p>
              )}
              <p className="text-slate-400 mt-[2px] text-center">
                Don't have an account ?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
