import { Link, useLocation } from "react-router";
import { FiPackage, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/authContext-hook";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/orders", label: "Orders" },
    { path: "/customers", label: "Customers" },
    { path: "/categories", label: "Categories & Brands" },
    { path: "/tools", label: "Tools" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border shadow-sm bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link
              to={user ? "/dashboard" : "/"}
              className="flex items-center gap-2 text-primary font-bold text-xl"
            >
              <FiPackage className="w-8 h-8" />
              <span>WarehouseMS</span>
            </Link>

            <div className="hidden md:flex gap-1">
              {user && navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium hover:text-amber-300 transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>

              {!user && (
            <Link
              className="text-white px-4 py-2 rounded-md text-sm font-medium hover:text-amber-300 transition-colors"
              to="/login"
            >
              Login
            </Link>
              )}
              {!user && (
            <Link
              className="px-4 py-2 text-white rounded-md text-sm font-medium hover:text-amber-300 transition-colors"
              to="/register"
            >
              Register
            </Link>
              )}
            <button
              onClick={logout}
              className="p-2 rounded-md hover:bg-accent text-foreground cursor-pointer hover:text-amber-300 transition-colors"
              title="Logout"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
