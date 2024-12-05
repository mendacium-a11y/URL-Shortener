import Navbar from "@/components/Navbar";
import { useState } from "react";

function Signup() {
  const [error, setError] = useState<string>("");

  const [userNameValid, setUserNameValid] = useState<boolean>(true);
  const [emailvalid, setEmailvalid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(username, email, password);

    // CHECKING FOR EMPTY FIELDS
    if (username && email && password) {
      setError("");
    } else {
      setError("Please fill all the fields");
    }
  };

  // REGEX FOR USERNAME VALIDATION
  const handleUserNameCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userNameValue = e.target.value;
    const usernameRegex = /^[a-zA-Z0-9_]{6,15}$/;
    setUserNameValid(usernameRegex.test(userNameValue));
  };

  // REGEX FOR EMAIL VALIDATION
  const handleEmailCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailvalid(emailRegex.test(emailValue));
  };

  // REGEX FOR PASSWORD VALIDATION
  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValid(passwordRegex.test(passwordValue));
  };

  return (
    <div>
      <Navbar />
      <div className="absolute -z-50 inset-0 text-white h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] flex justify-center items-center"></div>
      <div className="flex justify-center items-center text-white p-5">
        <div className="lg:w-[40vw] rounded-3xl shadow-sm shadow-white p-6 flex justify-center items-center flex-col">
          {/* HEADING SECTION */}
          <div className="top text-center">
            <h1 className="text-5xl bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent font-old">
              Create An Account
            </h1>
          </div>

          {/* FORM FOR LOGIN */}
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="w-full mt-8 flex flex-col gap-5 font-exo"
          >
            <div className="formElements w-full flex flex-col gap-5">
              <input
                className={`w-full text-gray-100 rounded-lg px-4 py-3 bg-gray-800/50 border border-gray-700/50 outline-none focus:ring-2 ${
                  !userNameValid
                    ? "focus:ring-red-500/50"
                    : "focus:ring-violet-500/50"
                } focus:border-violet-500/50 transition duration-300 placeholder:text-gray-400 placeholder:tracking-widest text-xl font-medium`}
                type="text"
                placeholder="USERNAME"
                name="username"
                onChange={handleUserNameCheck}
              />
              {!userNameValid && (
                <span className="text-red-400 text-sm">
                  Username must be between 6 and 15 characters and contains
                  underscores, numbers and special symbols.
                </span>
              )}

              <input
                className={`w-full text-gray-100 rounded-lg px-4 py-3 bg-gray-800/50 border border-gray-700/50 outline-none focus:ring-2 ${
                  !emailvalid
                    ? "focus:ring-red-500/50"
                    : "focus:ring-violet-500/50"
                } focus:border-violet-500/50 transition duration-300 placeholder:text-gray-400 placeholder:tracking-widest text-xl font-medium`}
                type="email"
                placeholder="EMAIL"
                name="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                onChange={handleEmailCheck}
              />
              {!emailvalid && (
                <span className="text-red-400 text-sm">
                  Please enter a valid email address
                </span>
              )}

              <input
                className={`w-full text-gray-100 rounded-lg px-4 py-3 bg-gray-800/50 border border-gray-700/50 outline-none focus:ring-2 ${
                  !passwordValid
                    ? "focus:ring-red-500/50"
                    : "focus:ring-violet-500/50"
                } focus:border-violet-500/50 transition duration-300 placeholder:text-gray-400 placeholder:tracking-widest text-xl font-medium`}
                type="password"
                placeholder="PASSWORD"
                name="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                onChange={handlePasswordCheck}
              />
              {!passwordValid && (
                <span className="text-red-400 text-sm">
                  Password must be at least 8 characters long and include at
                  least one uppercase letter, one lowercase letter, one number,
                  and one special character
                </span>
              )}
            </div>

            <div className="bottom w-full flex flex-col gap-2 mt-5">
              <button className="text-2xl tracking-wider font-medium p-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition duration-300 shadow-lg hover:shadow-violet-500/25">
                CREATE ACCOUNT
              </button>
              {error && (
                <p className="text-red-400 text-lg text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                  {error}
                </p>
              )}
              <p className="text-slate-400 mt-[2px] text-center">
                Already have an account ?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
