import { useToast } from "@/components/ui/use-toast";
import { hasEmptyPropertyExcludingKey } from "../utils/trackers.util.js";
import { MESSAGE, TRACKER_CATEGORIES } from "./trackers/trackers.constants.js";
import useEditTracker from "@/hooks/useEditTracker";
import {
  DialogDescription,
  DialogFooter,
  DialogTitle,
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
          title: MESSAGE.error,
          description: "⚠️ Le tracker n'a pas été mis à jour !",
        })
      : toast({
          description: MESSAGE.update,
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
              autoComplete="off"
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

export { UpdateTrackerForm };
