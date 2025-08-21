import { NavLink, Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div className="flex flex-col bg-zinc-950 text-white h-screen overflow-hidden font-[gilroy] relative">
      
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-widest text-white">
          GenFrame
        </h1>
        <h3>🥱 Developer Dipu</h3>
      </header>

      {/* Content area */}
      <div className="grow overflow-y-auto p-8">
        <Outlet />
      </div>

      {/* Floating bottom navbar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-8 text-sm uppercase px-8 py-3 rounded-md bg-zinc-900/80 backdrop-blur-md shadow-lg border border-white/10">
          <NavLink
            className={({ isActive }) =>
              `transition-colors duration-300 hover:text-amber-200 text-nowrap ${
                isActive ? "text-amber-200" : "text-gray-300"
              }`
            }
            to={"/"}
          >
            posts
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `transition-colors duration-300 hover:text-green-300 text-nowrap ${
                isActive ? "text-green-300" : "text-gray-300"
              }`
            }
            to={"/create"}
          >
            create post
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `transition-colors duration-300 hover:text-blue-300 text-nowrap ${
                isActive ? "text-blue-300" : "text-gray-300"
              }`
            }
            to={"/imagine"}
          >
            imagine
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
