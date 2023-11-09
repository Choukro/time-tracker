import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trackersFinished, trackersInProgress } from "@/utils/trackers.util.js";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input.jsx";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { NewTracker } from "./NewTracker.jsx";

const TrackersFollowUp = ({
  trackers,
  trackersCount,
  onTextChange,
  onAllTracker,
  onTrackersInProgress,
  onTrackersFinished,
  onAddTracker,
}) => {
  const finished = trackersFinished(trackers);
  const inProgress = trackersInProgress(trackers);
  const handleChange = (e) => {
    onTextChange(e.target.value);
  };
  return (
    <Card className="md:m-10 mt-5 bg-gradient-to-r from-custom1 to-custom2 relative">
      <CardHeader>
        <CardTitle className="md:text-3xl text-2xl font-bold dark:text-white sm:py-8 pt-8">
          Ajout & Gestion
        </CardTitle>
        <NewTracker onAddTracker={onAddTracker} />
      </CardHeader>
      <CardContent className="flex justify-around flex-col gap-3 md:flex-row mb-5">
        <Button
          variant="outline"
          className="md:w-[30%] w-full h-auto flex justify-center flex-row gap-2 p-2 hover:bg-purple-200"
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
          className="md:w-[30%] w-full h-auto flex justify-center flex-row gap-2 p-2 hover:bg-purple-200"
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
          className="md:w-[30%] w-full h-auto flex justify-center flex-row gap-2 p-2 hover:bg-purple-200"
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
        <div className="md:w-[75%] w-full mx-auto flex flex-row">
          <Input
            type="text"
            placeholder="Rechercher un tracker..."
            onChange={handleChange}
            name="search"
          ></Input>
        </div>
      </CardFooter>
    </Card>
  );
};

export { TrackersFollowUp };
