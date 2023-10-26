import * as React from "react";
import { diffTime, getHourAsString } from "../utils/trackers.util.js";
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
import {
  CounterClockwiseClockIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "./ui/input.jsx";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button.jsx";
import {
  TRACKER_CATEGORY_1,
  TRACKER_CATEGORY_2,
  TRACKER_CATEGORY_3,
  TRACKER_CATEGORY_4,
  TRACKER_CATEGORY_5,
} from "./trackers/trackers.constants.js";

const TrackerRow = ({ tracker, selectedId, onSelected }) => {
  const starttime = getHourAsString(tracker?.starttime);
  const endtime = tracker?.endtime
    ? getHourAsString(tracker?.endtime)
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
                {starttime} - {endtime}
              </CardDescription>
            </div>
          </div>
          <div className="w-1/3">
            <CardContent className="flex flex-col gap-2 p-1">
              <CounterClockwiseClockIcon className="ml-auto" />
              <p className="font-bold dark:text-white text-right">{duration}</p>
            </CardContent>
          </div>
          <div>
            <CardFooter className="flex flex-col gap-1 pb-0 pr-0">
              <Dialog>
                <DialogTrigger className="rounded p-1 hover:bg-pink-300">
                  <Pencil1Icon />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="mt-10 text-purple-400">
                    Modification du Tracker {tracker.id}
                  </DialogTitle>
                  <Separator className="my-2" />
                  <DialogDescription>
                    Vous pouvez modifier les informations du tracker ci-dessous.
                  </DialogDescription>
                  <Separator className="my-2" />
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="trackerName">Nom du tracker : </Label>
                      <Input
                        type="text"
                        id="trackerName"
                        placeholder="Tracker name..."
                        defaultValue={tracker.name}
                      />
                    </div>
                    <div>
                      <Label htmlFor="trackerDateStart">Date de début : </Label>
                      <Input
                        id="trackerDateStart"
                        type="datetime-local"
                        placeholder="Date de début..."
                        defaultValue={tracker.starttime}
                      ></Input>
                    </div>
                    <div>
                      <Label htmlFor="trackerDateEnd">Date de fin : </Label>
                      <Input
                        id="trackerDateEnd"
                        type="datetime-local"
                        placeholder="Date de fin..."
                        defaultValue={tracker.endtime}
                      ></Input>
                    </div>
                    <div>
                      <Label>Categorie : </Label>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={tracker.category} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={TRACKER_CATEGORY_1}>
                            {TRACKER_CATEGORY_1}
                          </SelectItem>
                          <SelectItem value={TRACKER_CATEGORY_2}>
                            {TRACKER_CATEGORY_2}
                          </SelectItem>
                          <SelectItem value={TRACKER_CATEGORY_3}>
                            {TRACKER_CATEGORY_3}
                          </SelectItem>
                          <SelectItem value={TRACKER_CATEGORY_4}>
                            {TRACKER_CATEGORY_4}
                          </SelectItem>
                          <SelectItem value={TRACKER_CATEGORY_5}>
                            {TRACKER_CATEGORY_5}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter className="mt-8">
                    <DialogClose asChild>
                      <Button variant="outline">Annuler</Button>
                    </DialogClose>
                    <Button className="">Enregistrer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger className="rounded p-1 hover:bg-pink-300">
                  <TrashIcon />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="mt-10 text-purple-400">
                    Suppression du Tracker {tracker.id}
                  </DialogTitle>
                  <Separator className="my-2" />
                  <DialogDescription>
                    Voulez-vous vraiment supprimez cette entrée ?
                  </DialogDescription>
                  <Separator className="my-2" />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Annuler</Button>
                    </DialogClose>
                    <Button variant="destructive">Supprimer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </div>
        </CardHeader>
      </Card>
    </li>
  );
};

export { TrackerRow };
