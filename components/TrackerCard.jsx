import * as React from "react";
import {
  diffTime,
  getHourAsString,
  hasEmptyPropertyExcludingKey,
} from "../utils/trackers.util.js";
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
import { TRACKER_CATEGORIES } from "./trackers/trackers.constants.js";
import useEditTracker from "../hooks/useEditTracker.js";
import { newDefaultTracker } from "../components/trackers/trackers.constants.js";
import { useToast } from "@/components/ui/use-toast";

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
  }, [refresh]);

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

  const UpdateTrackerForm = ({ tracker, onUpdateTracker, afterSave }) => {
    const error = hasEmptyPropertyExcludingKey(tracker, "endtime");
    const { toast } = useToast();
    const { updateTracker } = useEditTracker(tracker);
    const handleUpdateTracker = (event) => {
      event.preventDefault();
      const data = {
        ...Object.fromEntries(new FormData(event.target)),
        id: tracker?.id,
      };
      onUpdateTracker(data);
      updateTracker();
      afterSave();
      error
        ? toast({
            variant: "destructive",
            title: "⚠️ Impossible de mettre à jour le tracker !",
            description: "💡 Essayez d'actualiser la page !",
          })
        : toast({
            description: " 🎉 Tracker mis à jour avec succès !",
          });
    };

    return (
      <>
        <DialogTitle className="mt-10 text-purple-400">
          Modification du Tracker
        </DialogTitle>
        <Separator className="my-2" />
        <DialogDescription>
          Vous pouvez modifier les informations du tracker ci-dessous.
        </DialogDescription>
        <Separator className="my-2" />
        <form onSubmit={handleUpdateTracker}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="trackerName">Nom du tracker : </Label>
              <Input
                type="text"
                id="trackerName"
                placeholder="Tracker name..."
                defaultValue={tracker.name}
                name="name"
                required="required"
                autocomplete="off"
              />
            </div>
            <div>
              <Label htmlFor="trackerDateStart">Date de début : </Label>
              <Input
                id="trackerDateStart"
                type="datetime-local"
                placeholder="Date de début..."
                defaultValue={tracker.starttime}
                name="starttime"
                step="2"
                required="required"
              ></Input>
            </div>
            <div>
              <Label htmlFor="trackerDateEnd">Date de fin : </Label>
              <Input
                id="trackerDateEnd"
                type="datetime-local"
                placeholder="Date de fin..."
                defaultValue={tracker.endtime}
                name="endtime"
                step="2"
              ></Input>
            </div>
            <div>
              <Label>Categorie : </Label>
              <Select defaultValue={tracker.category} name="category">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TRACKER_CATEGORIES.cat1}>
                    {TRACKER_CATEGORIES.cat1}
                  </SelectItem>
                  <SelectItem value={TRACKER_CATEGORIES.cat2}>
                    {TRACKER_CATEGORIES.cat2}
                  </SelectItem>
                  <SelectItem value={TRACKER_CATEGORIES.cat3}>
                    {TRACKER_CATEGORIES.cat3}
                  </SelectItem>
                  <SelectItem value={TRACKER_CATEGORIES.cat4}>
                    {TRACKER_CATEGORIES.cat4}
                  </SelectItem>
                  <SelectItem value={TRACKER_CATEGORIES.cat5}>
                    {TRACKER_CATEGORIES.cat5}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </>
    );
  };

  const DeleteTrackerForm = ({ tracker, onDeleteTracker, afterDelete }) => {
    const { deleteTracker } = useEditTracker(tracker);
    const { toast } = useToast();
    let error = false;
    tracker.id ? error : (error = true);
    const handleDeleteTracker = () => {
      onDeleteTracker(tracker);
      deleteTracker(newDefaultTracker());
      afterDelete();
      error
        ? toast({
            variant: "destructive",
            title: "⚠️ Impossible de supprimer le tracker !",
            description: "💡 Essayez d'actualiser la page !",
          })
        : toast({
            description: " 🎉 Tracker supprimé avec succès !",
          });
    };
    return (
      <>
        <DialogTitle className="mt-10 text-purple-400">
          Suppression du Tracker
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
          <Button variant="destructive" onClick={handleDeleteTracker}>
            Supprimer
          </Button>
        </DialogFooter>
      </>
    );
  };

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
