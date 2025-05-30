import { Link } from "react-router-dom";
import Logo from "./Logo";
import { HamburgerMenu, Logout, Setting2, User } from "iconsax-reactjs";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

function Navbar() {
  const { authUser, logOut } = useAuthStore();
  const [isShowNav, setIsShowNav] = useState<boolean>(false);
  return (
    <>
      <header className="py-8 sticky top-0 flex items-center  justify-between">
        <Logo />

        <button
          className="block md:hidden"
          onClick={() => setIsShowNav((prev) => !prev)}>
          <HamburgerMenu size="32" className="text-base" />
        </button>

        <div className=" items-center gap-x-3 hidden md:flex">
          <button className="btn">
            <Link to="/setting" className="flex items-center gap-x-2">
              <Setting2 size="20" className="text-base mt-1" />
              <div className="text-lg">Settings</div>
            </Link>
          </button>
          {authUser ? (
            <>
              <button className="btn">
                <Link
                  to="/profile"
                  className="flex items-center gap-x-2  btn-outline">
                  <User size="20" className="text-base mt-1" />
                  <div className="text-lg">Profile</div>
                </Link>
              </button>
              <button onClick={logOut} className="btn btn-soft btn-error">
                <Logout size="20" className="text-base mt-1" />
                <div className="text-lg">Logout</div>
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </header>
      {/* mobile navbar */}
      <div
        className={`md:hidden px-3 absolute top-0 left-0 w-[70%] min-h-screen bg-base-200 text-base-content transition-all duration-500 ${
          isShowNav ? " translate-x-0" : "-translate-x-full"
        } `}>
        <ul className="space-y-6 py-6">
          <button className="btn">
            <li>
              <Link to="/setting" className="flex items-center gap-x-2">
                <Setting2 size="20" className="text-base mt-1" />
                <div className="text-lg">Settings</div>
              </Link>
            </li>
          </button>

          {authUser ? (
            <>
              <li>
                <button className="btn">
                  <Link
                    to="/profile"
                    className="flex items-center gap-x-2  btn-outline">
                    <User size="20" className="text-base mt-1" />
                    <div className="text-lg">Profile</div>
                  </Link>
                </button>
              </li>
              <li>
                <button onClick={logOut} className="btn btn-soft btn-error">
                  <Logout size="20" className="text-base mt-1" />
                  <div className="text-lg">Logout</div>
                </button>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
