import { TrackersApp } from "../components/TrackersApp";
import "./styles/page.css";

export default function Home() {
  return (
    <main className="flex flex-col justify-between p-10">
      <div className="flex flex-col gap-4 max-w-4xl m-auto">
        <h1 className="font-extrabold text-transparent text-8xl leading-tight	bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Time Tracker
        </h1>
      </div>
      <div className="Page">
        <div className="Page-header"></div>
        <div className="Page-content">
          <TrackersApp />
        </div>
      </div>
    </main>
  );
}
