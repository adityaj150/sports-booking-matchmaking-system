import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Left Side: Logo & Location */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-1">
                            <span className="text-3xl font-extrabold text-playo-green tracking-tight">PLAYO</span>
                            <div className="w-2 h-2 rounded-full bg-playo-green mt-3"></div>
                        </Link>

                        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                            <span className="mr-2">📍</span>
                            <span>Bangalore</span>
                        </div>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/matchmaking" className="flex items-center gap-2 text-gray-600 hover:text-playo-green font-medium transition-colors">
                            <span>🏃</span>
                            <span>Play</span>
                        </Link>
                        <Link to="/book-court" className="flex items-center gap-2 text-gray-600 hover:text-playo-green font-medium transition-colors">
                            <span>🎾</span>
                            <span>Book</span>
                        </Link>
                        {/* Placeholder for Train */}
                        <div className="flex items-center gap-2 text-gray-600 hover:text-playo-green font-medium transition-colors cursor-pointer">
                            <span>🧢</span>
                            <span>Train</span>
                        </div>
                    </div>

                    {/* Right Side: Auth */}
                    <div>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600 hidden sm:block font-medium">{user.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-600 hover:text-red-500 font-medium text-sm transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-playo-green font-medium transition-colors">
                                <span className="text-xl">👤</span>
                                <span>Login / Signup</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
