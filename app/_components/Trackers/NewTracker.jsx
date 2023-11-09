import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NewTrackerForm } from "./NewTrackerForm.jsx";
import { PlusSquare } from "lucide-react";

const NewTracker = ({ onAddTracker }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <div className="absolute sm:top-1 top-0 sm:right-3 right-[40%]">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="hover:bg-slate-500 sm:hover:p-6">
            <PlusSquare />
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
