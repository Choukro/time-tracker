import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trackersFinished, trackersInProgress } from "@/utils/trackers.util.js";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "./ui/input.jsx";
import db from "../data/data.js";
import { RotateCcw } from "lucide-react";
import { Button } from "./ui/button.jsx";

const TrackersFollowUp = ({
  trackers,
  trackersCount,
  onTextChange,
  onAllTracker,
  onTrackersInProgress,
  onTrackersFinished,
}) => {
  const finished = trackersFinished(trackers);
  const inProgress = trackersInProgress(trackers);
  const handleChange = (e) => {
    onTextChange(e.target.value);
  };
  return (
    <Card className="m-10 bg-gradient-to-r from-[#c084fc99] to-[#f472b699]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold dark:text-white py-4">
          Suivi & Recherche
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-around flex-col gap-3 md:flex-row mb-5">
        <Button
          variant="outline"
          className="w-[20%] h-auto flex justify-center flex-row gap-2 p-2 hover:bg-purple-200"
          onClick={onTrackersFinished}
          disabled={finished.length === 0}
        >
          <div className="p-0 text-slate-600 text-base my-auto">Terminés</div>
          <Avatar className="my-auto">
            <AvatarFallback>
              {finished.length === 0 ? "-" : finished.length}
            </AvatarFallback>
          </Avatar>
        </Button>
        <Button
          variant="outline"
          className="w-[20%] h-auto flex justify-center flex-row gap-2 p-2 hover:bg-purple-200"
          onClick={onTrackersInProgress}
          disabled={inProgress.length === 0}
        >
          <div className="p-0 text-slate-600 text-base my-auto">En cours</div>
          <Avatar className="my-auto">
            <AvatarFallback>{inProgress.length}</AvatarFallback>
          </Avatar>
        </Button>
        <Button
          variant="outline"
          className="w-[20%] h-auto flex justify-center flex-row gap-2 p-2 hover:bg-purple-200"
          onClick={onAllTracker}
        >
          <div className="p-0 text-slate-600 text-base my-auto">
            {trackers.length < trackersCount ? " " : "Total"}
          </div>
          <Avatar className="my-auto">
            <AvatarFallback>
              {trackers.length < trackersCount ? (
                <RotateCcw />
              ) : (
                trackers.length
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </CardContent>
      <CardFooter>
        <div className="w-[75%] mx-auto flex flex-row">
          <Input
            type="text"
            placeholder="Recherche à l'aide du libéllé du tracker..."
            onChange={handleChange}
            name="search"
          ></Input>
        </div>
      </CardFooter>
    </Card>
  );
};

export { TrackersFollowUp };
