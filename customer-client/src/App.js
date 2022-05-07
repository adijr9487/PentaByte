import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import ComplaintBox from "./components/ComplaintBox";
import Map from "./components/Map";
import Profile from "./components/Profile";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  return (
    <div>
      <Header handleOpen={handleOpen} />
      <Profile open={open} handleOpen={handleOpen} />
      <div
        className="w-auto h-full grid grid-cols-12 align-middle px-16 pt-10"
        style={{ marginTop: "10vh" }}
      >
        <div className="sm:col-span-7 lg:col-span-8 xl:col-span-9 col-span-12">
          <Map />
        </div>
        <div className="sm:col-span-5 lg:col-span-4 xl:col-span-3 col-span-12">
          <ComplaintBox />
        </div>
      </div>
    </div>
  );
}

export default App;
