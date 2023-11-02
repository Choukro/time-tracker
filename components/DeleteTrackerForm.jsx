import {
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button.jsx";
import useEditTracker from "../hooks/useEditTracker.js";
import {
  MESSAGE,
  newDefaultTracker,
} from "../components/trackers/trackers.constants.js";
import { useToast } from "@/components/ui/use-toast";

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
          title: MESSAGE.error,
          description: "⚠️ Le tracker n'a pas été supprimé !",
        })
      : toast({
          description: MESSAGE.delete,
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

export { DeleteTrackerForm };
