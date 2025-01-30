import Navbar from "./components/Navbar";

const AboutUs = () => {
  return(
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full mt-2">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between py-16 px-6 bg-white space-y-6 md:space-y-0 md:space-x-6">
          <h2 style={{color: "var(--purple)"}} className="text-5xl font-bold">¿Quiénes somos?</h2>
          <p className="text-gray-700 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div style={{background: "var(--grey50)"}} className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between py-16 px-6 space-y-6 md:space-y-0 md:space-x-6">
          <p className="text-gray-700 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h2 style={{color: "var(--purple)"}} className="text-5xl font-bold">¿Cómo funciona?</h2>
        </div>

        <div className="w-full max-w-5xl flex items-center justify-center py-16 px-6 bg-white">
          <h2 style={{color: "var(--purple)"}} className="text-5xl font-bold">Contacto</h2>
        </div>
      </div>
    </>
  )
}

export default AboutUs;