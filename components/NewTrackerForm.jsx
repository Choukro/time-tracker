import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import useEditTracker from "@/hooks/useEditTracker";
import { TRACKER_CATEGORIES } from "./trackers/trackers.constants.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { newDefaultTracker } from "../components/trackers/trackers.constants.js";

const NewTrackerForm = ({ onAddTracker, afterAdd }) => {
  const { toast } = useToast();
  const { tracker, setTracker, createTracker } = useEditTracker(
    newDefaultTracker()
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onAddTracker(tracker);
    createTracker();
    afterAdd();
    toast({
      description: " 🎉 Nouveau tracker ajouté avec succès !",
    });
  };

  const handleTrackerName = (e) => {
    setTracker({ ...tracker, name: e.target.value });
  };

  const handleTrackerStartTime = (e) => {
    setTracker({ ...tracker, starttime: e.target.value });
  };

  const handleTrackerEndTime = (e) => {
    setTracker({ ...tracker, endtime: e.target.value });
  };

  const handleTrackerCategory = (e) => {
    setTracker({ ...tracker, category: e.target.value });
  };

  return (
    <>
      <DialogTitle className="mt-10 text-purple-400">
        Ajout d&rsquo;un nouveau Tracker
      </DialogTitle>
      <Separator className="my-2" />
      <DialogDescription>
        Remplissez les informations ci-dessous.
      </DialogDescription>
      <Separator className="my-2" />
      <form onSubmit={handleOnSubmit}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="newTrackerName">Nom du tracker : </Label>
            <Input
              type="text"
              id="newTrackerName"
              placeholder="Nom du tracker..."
              onChange={handleTrackerName}
              value={tracker.name}
              required="required"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="newTrackerDateStart">Date de début : </Label>
            <Input
              id="newTrackerDateStart"
              type="datetime-local"
              placeholder="Date de début..."
              onChange={handleTrackerStartTime}
              value={tracker.starttime}
              step="2"
              required="required"
            ></Input>
          </div>
          <div>
            <Label htmlFor="newTrackerDateEnd">Date de fin : </Label>
            <Input
              id="newTrackerDateEnd"
              type="datetime-local"
              placeholder="Date de fin..."
              onChange={handleTrackerEndTime}
              value={tracker.endtime}
              step="2"
            ></Input>
          </div>
          <div>
            <Label>Categorie : </Label>
            <Select defaultValue={TRACKER_CATEGORIES.cat5}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  value={tracker.category}
                  onChange={handleTrackerCategory}
                />
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
          <Button type="submit">Ajouter</Button>
        </DialogFooter>
      </form>
    </>
  );
};

export { NewTrackerForm };
