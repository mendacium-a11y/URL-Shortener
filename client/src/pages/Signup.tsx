import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/Firebase/firebase";

function Signup() {
  const [error, setError] = useState<string>("");

  const [userNameValid, setUserNameValid] = useState<boolean>(true);
  const [emailvalid, setEmailvalid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // UPDATED THE PROFILE BY UPDATING THE DISPLAY NAME
      const user = userCredentials.user;
      await updateProfile(user as any, {
        displayName: username,
      });
      console.log(`User created successfully`);
      window.location.href = "/";
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already exist.");
      } else {
        setError("An error occurred: " + error.message);
        console.error(error.message);
      }
    }
  };

  // REGEX FOR PASSWORD VALIDATION (REAL TIME)
  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValid(passwordRegex.test(passwordValue));
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
      <div className="w-full max-w-md lg:w-[40vw] rounded-3xl shadow-sm shadow-white p-8 flex justify-center items-center flex-col">
        {/* HEADING SECTION */}
        <div className="text-center w-full mb-6">
          <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Create An Account
          </h1>
        </div>

        {/* FORM FOR LOGIN */}
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4"
        >
          <div className="formElements w-full flex flex-col gap-4 text-white">
            {/* USERNAME FIELD */}
            <div>
              <label htmlFor="user" className="text-2xl block mb-2">
                UserName
              </label>
              <input
                type="text"
                id="username"
                name="username"
                pattern="^[a-zA-Z0-9_]{6,15}$"
                title="Username must be between 6 and 15 characters and contain only letters, numbers, and underscores."
                className="w-full bg-transparent border-b-4 focus:outline-none focus:border-b-8"
              />
            </div>

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
                onChange={handlePasswordCheck}
              />
              {!passwordValid && (
                <span className="text-red-400 text-sm mt-1 block">
                  Password must be at least 8 characters long and include at
                  least one uppercase letter, one lowercase letter, one number,
                  and one special character
                </span>
              )}
            </div>
          </div>

          <div className="bottom w-full flex flex-col gap-4 mt-4">
            <button className="text-2xl tracking-wider font-medium p-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition duration-300 shadow-lg hover:shadow-violet-500/25">
              CREATE ACCOUNT
            </button>
            {error && (
              <p className="text-red-400 text-lg text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                {error}
              </p>
            )}
            <p className="text-slate-400 mt-2 text-center">
              Already have an account ?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
