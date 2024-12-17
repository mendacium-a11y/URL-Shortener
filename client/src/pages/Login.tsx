
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { auth } from "@/Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";

export default function Login() {
  // State to handle login errors
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // ENSURE THAT EMAIL AND PASSWORD ARE STRINGS
    if (typeof email === "string" && typeof password === "string") {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log(`user logged in successfully`);
        window.location.href = "/";
        setError("");
      } catch (error: any) {
        setError("Invalid credentials");
        console.error(error.message);
      }
    } else {
      setError("Please fill in all the fields with valid data.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[80vh] text-white p-5">
        <div className="w-full max-w-md lg:w-[40vw] rounded-3xl shadow-sm shadow-white p-6 flex justify-center items-center flex-col">
          {/* Heading Section */}
          <div className="top text-center">
            <h1 className="text-5xl bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent font-old">
              Welcome Back!
            </h1>
            <p className="text-slate-400 text-lg">Please sign in to continue</p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full mt-8 flex flex-col gap-5 font-exo"
          >
            <div className="formElements w-full flex flex-col gap-5">
              {/* EMAIL FIELD */}
              <div>
                <label htmlFor="user" className="text-2xl block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address."
                  className="w-full bg-transparent border-b-4 focus:outline-none focus:border-b-8"
                />
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <label htmlFor="user" className="text-2xl block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-transparent border-b-4 focus:outline-none focus:border-b-8"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
                />
              </div>
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
                Don't have an account?{" "}
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
