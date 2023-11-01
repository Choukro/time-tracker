import { TrackersApp } from "../components/TrackersApp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col justify-between p-10">
      <div className="flex flex-col gap-4 max-w-4xl m-auto">
        <h1 className="font-extrabold text-transparent md:pb-10 pb-2 md:text-8xl sm:text-6xl text-4xl leading-tight	bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Time Tracker
        </h1>
      </div>
      <Card className="text-center bg-slate-200">
        <CardContent>
          <TrackersApp />
        </CardContent>
      </Card>
    </main>
  );
}
