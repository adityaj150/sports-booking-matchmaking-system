import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-16 pb-20">

      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mt-4">
        {/* Left Text Content */}
        <div className="flex-1 text-left space-y-6">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-600 font-medium">
            <span>📍</span> Bangalore
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-dark leading-[1.15]">
            BOOK SPORTS <br /> VENUES. <br />
            JOIN <span className="text-playo-green">GAMES.</span> <br />
            FIND TRAINERS.
          </h1>

          <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
            The World's Largest Sports Community to Book Venues, Find Trainers, and Join Games Near you.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white p-2 rounded-full shadow-lg border border-gray-100 max-w-md w-full">
            <span className="pl-4 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search for venues, sports..."
              className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="bg-playo-green hover:bg-lime-500 text-white p-3 rounded-full transition-colors w-12 h-12 flex items-center justify-center">
              ➔
            </button>
          </div>
        </div>

        {/* Right Hero Image Collage with Center Logo */}
        <div className="flex-1 relative h-[500px] w-full hidden md:block">
          <div className="absolute inset-0 grid grid-cols-2 gap-2 rounded-3xl overflow-hidden">
            <div
              className="bg-gray-200 h-full w-full bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop)' }} // Basketball
            ></div>
            <div className="grid grid-rows-2 gap-2 h-full">
              <div
                className="bg-gray-200 h-full w-full bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1626224583764-847890e05851?q=80&w=2054&auto=format&fit=crop)' }} // Badminton
              ></div>
              <div
                className="bg-gray-200 h-full w-full bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1936&auto=format&fit=crop)' }} // Football
              ></div>
            </div>
          </div>
          {/* Center Circle Logo Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-playo-green rounded-full flex items-center justify-center border-4 border-white shadow-xl z-10 transition-transform hover:scale-110">
            <span className="text-white text-4xl font-bold">P</span>
          </div>
        </div>
      </div>

      {/* BOOK VENUES SECTION */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-dark">Book Venues</h2>
          <button
            onClick={() => navigate("/book-court")}
            className="text-playo-green font-bold text-sm hover:underline flex items-center gap-1"
          >
            SEE ALL VENUES <span>›</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Smaaash Badminton", loc: "Koramangala", rating: "4.8", reviews: "250", img: "https://images.unsplash.com/photo-1626224583764-847890e05851?q=80&w=2054&auto=format&fit=crop" },
            { name: "Xtreme Sports Arena", loc: "Indiranagar", rating: "4.5", reviews: "120", img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2070&auto=format&fit=crop" },
            { name: "Kickoff Turf", loc: "HSR Layout", rating: "4.9", reviews: "310", img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2070&auto=format&fit=crop" },
            { name: "Pro Tennis Academy", loc: "Whitefield", rating: "4.7", reviews: "85", img: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop" }
          ].map((venue, i) => (
            <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer">
              <div className="h-40 overflow-hidden relative">
                <img src={venue.img} alt={venue.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-playo-green text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                  ★ {venue.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 truncate">{venue.name}</h3>
                <p className="text-sm text-gray-500 mt-1 truncate">{venue.loc}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400 font-medium">{venue.reviews} ratings</span>
                  <button className="text-playo-green text-xs font-bold bg-green-50 px-3 py-1.5 rounded-full group-hover:bg-playo-green group-hover:text-white transition-colors">
                    BOOK
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DISCOVER GAMES SECTION */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-dark">Discover Games</h2>
          <button
            onClick={() => navigate("/matchmaking")}
            className="text-playo-green font-bold text-sm hover:underline flex items-center gap-1"
          >
            SEE ALL GAMES <span>›</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { sport: "Badminton", type: "Doubles • Intermediate", count: "2/4", time: "Today, 6:00 PM", loc: "Smash Arena, HSR" },
            { sport: "Football", type: "5v5 • Beginner", count: "1/10", time: "Tomorrow, 7:00 AM", loc: "Turf Park, Bellandur" },
            { sport: "Tennis", type: "Singles • Advanced", count: "1/2", time: "Sat, 5:00 PM", loc: "Top Spin Academy" },
          ].map((game, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-playo-green"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{game.sport}</p>
                  <h3 className="font-bold text-lg text-gray-800 mt-1">{game.type}</h3>
                </div>
                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">
                  {game.count} Going
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-lg">🕒</span> {game.time}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-lg">📍</span> {game.loc}
                </div>
              </div>

              <button className="w-full mt-6 bg-white border-2 border-playo-green text-playo-green font-bold py-2 rounded-xl hover:bg-playo-green hover:text-white transition-all">
                JOIN GAME
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* POPULAR SPORTS SECTION */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-dark">Popular Sports</h2>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {[
            { name: "Badminton", img: "https://images.unsplash.com/photo-1626224583764-847890e05851?q=80&w=2054&auto=format&fit=crop" },
            { name: "Football", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1936&auto=format&fit=crop" },
            { name: "Cricket", img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop" },
            { name: "Tennis", img: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop" },
            { name: "Swimming", img: "https://images.unsplash.com/photo-1600965962102-96f5063204d2?q=80&w=1896&auto=format&fit=crop" },
            { name: "Basketball", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop" },
          ].map((sport, i) => (
            <div key={i} className="min-w-[160px] h-[220px] rounded-2xl overflow-hidden relative cursor-pointer group">
              <img src={sport.img} alt={sport.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <span className="absolute bottom-4 left-4 text-white font-bold text-lg">{sport.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-gray-200 pt-12 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Company</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>About Us</li>
              <li>Partner with us</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Services</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>Book Venues</li>
              <li>Matchmaking</li>
              <li>Coaching</li>
              <li>Tournaments</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Social</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>contact@playo.co</li>
              <li>+91 99999 99999</li>
              <li>Bangalore, India</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm pt-8 border-t border-gray-100">
          © 2026 SportsHub (Playo Clone). All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default Home;
