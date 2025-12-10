import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/default-avatar.jpg";
import logo from "../../../assets/images/Blood aid.png";

const desktopNav = ({ isActive }) =>
  isActive
    ? " text-red-600 border-b-2 border-red-600 pb-1"
    : "hover:text-red-600 transition";

const mobileNav = ({ isActive }) =>
  `px-4 py-3 ${
    isActive ? "bg-red-50 text-red-600 font-semibold" : "hover:bg-neutral-100"
  }`;

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-red-50 fixed inset-x-0 top-0 z-50">
      <div className="mx-4 bg-white shadow rounded">
        <Container>
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-1">
              <img src={logo} alt="logo" width="30" />
              <span className="hidden text-2xl md:block font-bold text-red-600">
                BloodAid
              </span>
            </Link>

            <div className="hidden md:flex gap-6 font-semibold">
              <NavLink to="/" className={desktopNav}>
                Home
              </NavLink>
              <NavLink to="/about" className={desktopNav}>
                About
              </NavLink>
              <NavLink to="/services" className={desktopNav}>
                Services
              </NavLink>
              <NavLink to="/events" className={desktopNav}>
                Events
              </NavLink>
              <NavLink to="/donation-requests" className={desktopNav}>
                Donation Requests
              </NavLink>
              <NavLink to="/search-donor" className={desktopNav}>
                Search Donor
              </NavLink>

              {user && (
                <NavLink to="/funding" className={desktopNav}>
                  Funding
                </NavLink>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 border p-2 rounded-full cursor-pointer hover:shadow"
              >
                <AiOutlineMenu />
                <img
                  src={user?.photoURL || avatarImg}
                  className="rounded-full"
                  width="20"
                />
              </div>

              {isOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded shadow-md text-sm z-50">
                  <div className="flex flex-col">
                    {/* Mobile links */}
                    <div className="md:hidden flex flex-col">
                      <NavLink to="/" className={mobileNav}>
                        Home
                      </NavLink>
                      <NavLink to="/about" className={mobileNav}>
                        About
                      </NavLink>
                      <NavLink to="/services" className={mobileNav}>
                        Services
                      </NavLink>
                      <NavLink to="/events" className={mobileNav}>
                        Events
                      </NavLink>
                      <NavLink to="/donation-requests" className={mobileNav}>
                        Donation Requests
                      </NavLink>
                      <NavLink to="/search-donor" className={mobileNav}>
                        Search Donor
                      </NavLink>

                      {user && (
                        <NavLink to="/funding" className={mobileNav}>
                          Funding
                        </NavLink>
                      )}
                      <hr />
                    </div>

                    {user ? (
                      <>
                        <NavLink to="/dashboard" className={mobileNav}>
                          Dashboard
                        </NavLink>
                        <button
                          onClick={logOut}
                          className="px-4 py-3 text-left hover:bg-neutral-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <NavLink to="/login" className={mobileNav}>
                          Login
                        </NavLink>
                        <NavLink to="/registration" className={mobileNav}>
                          Register
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
