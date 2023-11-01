import * as React from "react";
import "./styles/TrackerEditForm.css";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NewTrackerForm } from "../components/NewTrackerForm.jsx";
import { PlusSquare } from "lucide-react";

const NewTracker = ({ onAddTracker }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <div className="absolute sm:top-1 top-0 sm:right-3 right-[40%]">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button>
            <PlusSquare className="" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <NewTrackerForm
            onAddTracker={onAddTracker}
            afterAdd={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { NewTracker };
