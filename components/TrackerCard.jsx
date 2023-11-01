import * as React from "react";
import { diffTime, getHourAsString } from "../utils/trackers.util.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Hourglass, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UpdateTrackerForm } from "./UpdateTrackerForm.jsx";
import { DeleteTrackerForm } from "./DeleteTrackerForm.jsx";

const TrackerCard = ({ tracker, onUpdateTracker, onDeleteTracker }) => {
  const starttime = getHourAsString(tracker?.starttime);
  const endtime = tracker?.endtime
    ? getHourAsString(tracker?.endtime)
    : "en cours ...";

  const [duration, setDuration] = React.useState(
    diffTime(tracker?.starttime, tracker?.endtime)
  );

  const refresh = React.useCallback(() => {
    setDuration(diffTime(tracker?.starttime, tracker?.endtime));
  }, [tracker.endtime, tracker.starttime]);

  React.useEffect(() => {
    const timerID = setTimeout(() => refresh(), 1000);
    return () => {
      clearTimeout(timerID);
    };
  }, [refresh, duration]);

  // React.useEffect(() => {
  //   const refresh = () => {
  //     setDuration(diffTime(tracker?.starttime, tracker?.endtime));
  //   };
  //   const timerID = setTimeout(() => refresh(), 1000);
  //   return () => {
  //     clearTimeout(timerID);
  //   };
  // }, [tracker.endtime, tracker.starttime, duration]);

  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

  return (
    <li key={tracker.id} className="cursor-pointer">
      <Card className="flex justify-between flex-row hover:bg-purple-200">
        <CardHeader className="flex flex-row gap-4">
          <Avatar className="my-auto">
            <AvatarFallback>{tracker.category[0]}</AvatarFallback>
          </Avatar>
          <div className="flex justify-around flex-col text-left !mt-0">
            <CardTitle>{tracker.name}</CardTitle>
            <div className="flex justify-start flex-row gap-4">
              <Badge>{tracker.category}</Badge>
              <CardDescription>
                {starttime} - {endtime}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-row gap-10 p-6">
          <div className="flex justify-between flex-col p-1 items-end">
            <Hourglass className="text-slate-600" />
            <p className="text-sm	dark:text-white text-slate-600">{duration}</p>
          </div>
          <div className="flex justify-between flex-col gap-2">
            <Dialog open={openDialogEdit} onOpenChange={setOpenDialogEdit}>
              <DialogTrigger className="rounded p-1 hover:bg-pink-300">
                <Pencil />
              </DialogTrigger>
              <DialogContent>
                <UpdateTrackerForm
                  tracker={tracker}
                  onUpdateTracker={onUpdateTracker}
                  afterSave={() => setOpenDialogEdit(false)}
                />
              </DialogContent>
            </Dialog>
            <Dialog open={openDialogDelete} onOpenChange={setOpenDialogDelete}>
              <DialogTrigger className="rounded p-1 hover:bg-pink-300">
                <Trash2 />
              </DialogTrigger>
              <DialogContent>
                <DeleteTrackerForm
                  tracker={tracker}
                  onDeleteTracker={onDeleteTracker}
                  afterDelete={() => setOpenDialogDelete(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </li>
  );
};

export { TrackerCard };
