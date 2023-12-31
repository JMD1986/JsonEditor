import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/sidebar";
import LiveEvents from "./components/LiveEvents";
import MiniGame from "./components/MiniGame";
import Mlm from "./components/Mlm";
import VideoAds from "./components/VideoAds";
import HourlyBonus from "./components/HourlyBonus";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Shop from "./routes/shop";
import { ShopList } from "./components/shop/ShopList";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="liveEvents" element={<LiveEvents />} />
          <Route path="hourlyBonus" element={<HourlyBonus />} />
          <Route path="videoAds" element={<VideoAds />} />
          <Route path="shop" element={<Shop />} />
          <Route path="miniGame" element={<MiniGame />} />
          <Route path="mlm" element={<Mlm />} />
          <Route path="shop/shopitems" element={<ShopList />} />

          <Route path="dashboard" element={<Dashboard />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <Header />
      <Sidebar />
      {/* <Outlet /> */}
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr /> */}

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
