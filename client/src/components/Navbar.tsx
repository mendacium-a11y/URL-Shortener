import { Button } from "@/components/ui/button";
import menu from "../assets/menu.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
// @ts-ignore
import { AuthContext, useAuth } from "../Context/AuthContext/index.jsx";
import { IoPeopleCircleSharp } from "react-icons/io5";

// Define the type for the context value
interface AuthContextType {
  currentUser: {
    displayName?: string;
    email?: string;
    [key: string]: any; // Allow extra properties
  } | null;
  userLoggedIn: boolean;
  loading: boolean;
}

export default function Navbar() {
  const toggleMenu = () => {};
  const { currentUser, userLoggedIn } = useAuth() as AuthContextType;
  const { logoutFunctionality } = useAuth();

  // FUNCTIONALITY TO ADD THE LOGOUT USER
  const handleLogout = async () => {
    // CALLED THE LOGOUT FUNCTION FROM THE CONTEXT
    await logoutFunctionality();

    // NAVIGATE THE USER TO THE HOME PAGE
    window.location.href = "/";
  };

  useEffect(() => {
    console.log(currentUser);
    console.log(userLoggedIn);
    console.log(window.location.pathname);
  }, [currentUser]);

  return (
    // <nav className='bg-slate-950 h-[12vh] my-auto text-white flex items-center'>
    <div
      id="heading"
      className="flex flex-row pe-4 sm:px-12 text-white py-4 justify-between items-center w-100 bg-black h-[10vh]"
    >
      <div className="px-10">
        <h1 className="text-3xl">Shortify</h1>
      </div>
      <div className="my-auto hidden sm:block">
        {userLoggedIn ? (
          <>
            <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-1 shadow-lg border border-white/20 hover:cursor-pointer">
              <div
                // onClick={} TODO: NAVIGATE USER TO PROFILE PAGE ON CLICK
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <img
                    src={currentUser?.photoURL || "/src/assets/noavatar.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400 shadow-md hover:border-emerald-300 transition-colors duration-300"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-white font-semibold text-sm">
                  {currentUser?.displayName}
                </span>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <button
                onClick={handleLogout}
                className="relative group px-5 py-2 rounded-xl font-semibold text-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-transform duration-300 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-white">Logout</span>
              </button>
            </div>
          </>
        ) : (
          <div className="md:flex items-center gap-2">
            {window.location.pathname !== "/contributors" && (
              <span
                onClick={() => (window.location.href = "/contributors")}
                className="flex items-center gap-1 text-white text-xl hover:transition-all duration-1000 hover:underline hover:cursor-pointer hover:text-violet-400"
              >
                <IoPeopleCircleSharp className="text-4xl" />
                <span>Contributors</span>
              </span>
            )}
            {window.location.pathname !== "/signup" && (
              <Button
                onClick={() => (window.location.href = "/signup")}
                variant="secondary"
                className="bg-slate-700 hover:bg-white rounded-3xl mx-2 h-12 w-32 text-white hover:text-black  text-lg"
              >
                Sign-up
              </Button>
            )}
            {window.location.pathname !== "/login" && (
              <Button
                onClick={() => (window.location.href = "/login")}
                variant="secondary"
                className="bg-violet-700 hover:bg-white rounded-3xl mx-2 h-12 w-32 text-white hover:text-black text-lg"
              >
                Login
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="my-auto block sm:hidden">
        <Popover>
          <PopoverTrigger>
            <Button
              className="bg-violet-700 hover:bg-white rounded-2xl mx-2 h-12 w-20 text-white hover:text-black  text-lg relative z-20"
              onClick={toggleMenu}
            >
              <img src={menu} alt="" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-dark border-0 flex flex-col justify-end items-end">
            {userLoggedIn ? (
              <>
                <div className="flex flex-col items-center gap-2 bg-white/10 rounded-2xl p-2 shadow-lg border border-white/20 hover:cursor-pointer sm:hidden">
                  <div
                    // onClick={} TODO: NAVIGATE USER TO PROFILE PAGE ON CLICK
                    className="flex items-center gap-3"
                  >
                    <div className="relative">
                      <img
                        src={
                          currentUser?.photoURL || "/src/assets/noavatar.png"
                        }
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400 shadow-md hover:border-emerald-300 transition-colors duration-300"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {currentUser?.displayName}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/20"></div>
                  <button
                    onClick={handleLogout}
                    className="relative group px-5 py-2 rounded-xl font-semibold text-sm overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-transform duration-300 group-hover:scale-105"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative text-white">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="md:flex items-center gap-2">
                {window.location.pathname !== "/contributors" && (
                  <span
                    onClick={() => (window.location.href = "/contributors")}
                    className="flex items-center gap-1 text-white text-xl hover:transition-all duration-1000 hover:underline hover:cursor-pointer hover:text-violet-400"
                  >
                    <IoPeopleCircleSharp className="text-4xl" />
                    <span>Contributors</span>
                  </span>
                )}
                {window.location.pathname !== "/signup" && (
                  <Button
                    onClick={() => (window.location.href = "/signup")}
                    variant="secondary"
                    className="bg-slate-700 hover:bg-white my-2  rounded-3xl mx-2 h-12 w-32 text-white hover:text-black  text-lg"
                  >
                    Sign-up
                  </Button>
                )}
                {window.location.pathname !== "/login" && (
                  <Button
                    onClick={() => (window.location.href = "/login")}
                    variant="secondary"
                    className="bg-violet-700 hover:bg-white my-2  rounded-3xl mx-2 h-12 w-32 text-white hover:text-black text-lg"
                  >
                    Login
                  </Button>
                )}
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
    // </nav>
  );
}
