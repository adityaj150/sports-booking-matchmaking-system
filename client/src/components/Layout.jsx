import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white text-dark font-sans selection:bg-playo-green selection:text-white">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
