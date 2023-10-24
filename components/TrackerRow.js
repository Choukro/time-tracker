import * as React from "react";
import { diffTime } from "../app/helper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const TrackerRow = ({ tracker, selectedId, onSelected }) => {
  const starttime = new Date(tracker?.starttime)
    .toLocaleString()
    .substring(11, tracker.starttime.length);
  const endtime = tracker?.endtime
    ? new Date(tracker?.endtime)
        .toLocaleString()
        .substring(11, tracker.endtime.length)
    : "en cours ...";

  const [duration, setDuration] = React.useState(
    diffTime(tracker?.starttime, tracker?.endtime)
  );

  React.useEffect(() => {
    const refresh = () => {
      setDuration(diffTime(tracker?.starttime, tracker?.endtime));
    };
    const timerID = setTimeout(() => refresh(), 1000);
    return () => {
      clearTimeout(timerID);
    };
  }, [duration, tracker?.endtime, tracker?.starttime]);

  const handleClick = (e) => {
    onSelected(tracker);
  };

  const selected =
    tracker.id === selectedId ? "bg-purple-400" : "hover:bg-purple-200";
  return (
    <li key={tracker.id} className="cursor-pointer">
      <Card className={selected} onClick={handleClick}>
        <CardHeader className="flex flex-row gap-4">
          <div>
            <Avatar>
              <AvatarFallback>{tracker.category[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-2 text-left w-2/3">
            <CardTitle>{tracker.name}</CardTitle>
            <div className="flex flex-row gap-2">
              <Badge>{tracker.category}</Badge>
              <CardDescription className="text-left">
                🕙 {starttime} - {endtime}
              </CardDescription>
            </div>
          </div>
          <div className="w-1/3">
            <CardContent className="flex flex-col gap-2 p-0">
              <p className="font-bold text-right">⏳</p>
              <p className="font-bold dark:text-white text-right">{duration}</p>
            </CardContent>
          </div>
          <div>
            <CardFooter className="flex flex-col gap-2 pb-0 pr-0">
              <button className="btn btn-primary">🔍</button>
              <button className="btn btn-primary">🔍</button>
            </CardFooter>
          </div>
        </CardHeader>
      </Card>
    </li>
  );
};

export { TrackerRow };
