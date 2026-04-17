import { Link, NavLink } from "react-router";
import { useAuth } from "../context";
import { toast } from "sonner"

export default function Navbar() {
  const { user, setAccessToken, setUser } = useAuth()
  const links = [
    {
      id: 1,
      path: "/new-task",
      label: "New Task",
    },
    {
      id: 2,
      path: "/my-tasks",
      label: "My Tasks",
    },
  ];

  const authLinks = [
    {
      id: 1,
      path: "/login",
      label: "Login",
    },
    {
      id: 2,
      path: "/register",
      label: "Register",
    },
  ];

  const handleLogout = () => {
    setAccessToken("")
    setUser(null)
    localStorage.removeItem("TaskDutyAuthKey")
    toast.info("Logout successful")
  }

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center py-5 px-4">
        <Link to="/">
          <img src="/logo.png" alt="logo" />
        </Link>

        {user ?
          <div className="flex items-center gap-4">
            {links.map((item) => (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "text-gray-700 font-semibold hidden md:block" : "hidden md:block"
                }
                key={item.id}
              >
                {item.label}
              </NavLink>
            ))}

            <h1 className="font-medium hover:text-red-500 cursor-pointer" onClick={handleLogout}>Logout</h1>

            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src="/avatar.png" alt="user-avatar" />
              </div>
            </div>
          </div>
          :
          <div className="flex items-center gap-4">
            {authLinks.map((item) => (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "text-gray-700 font-semibold hidden md:block" : "hidden md:block"
                }
                key={item.id}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        }
      </div>
    </header>
  );
}
