import { Link, useLocation, useNavigate } from "react-router-dom";
import car from "../assets/cart.png";
import dman from "../assets/dman.avif";
import { useState, useEffect } from "react";

export const Header = ({ cart, userData, setcart }) => {
  const location = useLocation();
  const [log, setlog] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  let totalQuantity = 0;
  for (const itemId in cart) {
    if (cart.hasOwnProperty(itemId)) {
      totalQuantity += cart[itemId].quantity;
    }
  }
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((response) => response.json())
            .then((data) => {
              setUserLocation(
                data.city || `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
              );
            })
            .catch((error) => {
              console.error("Error fetching location data:", error);
              setUserLocation(
                `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
              );
            });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not available");
    }
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full h-18 max-w-screen-md border border-gray-100 bg-white/80 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-2">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center">
              <img
                src={dman}
                alt="Boy riding a bike"
                className="h-16 w-22 mix-blend-multiply mr-3 -mx-2 sm:rounded-l-3xl"
              />
              {userLocation && (
                <span className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-white bg-gray-900 transition-all duration-200">
                  {userLocation}
                </span>
              )}
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <Link to="/body">
              <span
                aria-current="page"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              >
                Home
              </span>
            </Link>
            <Link to="/restaurantlist">
              <span className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                Restaurants
              </span>
            </Link>
            <Link to="/about">
              <span className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                About
              </span>
            </Link>
            <Link to="/contact">
              <span className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                Contact
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-end gap-3">
            {log ? (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                  setlog(false);
                }}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500"
              >
                Login
              </button>
            )}

            {!isLoginPage && (
              <div className="flex items-center">
                <Link to="/view">
                  <img className="h-10" src={car} alt="Cart icon" />
                </Link>
                <p className="ml-2 font-bold">{totalQuantity}</p>
              </div>
            )}
            <span className=" bg-purple-900 px-5  hidden items-center justify-center rounded-full text-white  py-2  text-3xl font-semibold shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-purple-800 sm:inline-flex">
              {userData.firstName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
