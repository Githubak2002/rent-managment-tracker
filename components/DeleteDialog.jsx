import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
// import useStore from "@/lib/store";
// import { useRouter } from "next/navigation";

// interface DeleteDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
//   description: string;
//   requireConfirmation?: boolean;
// }

export default function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  requireConfirmation = false,
}) {
  const [deleteText, setDeleteText] = useState("");

  // const {showDeleteRenterDialog, setShowDeleteRenterDialog} = useStore();
  // const router = useRouter();


  const handleConfirm = () => {
    if (!requireConfirmation || deleteText === "DELETE") {
      onConfirm();
      setDeleteText("");
    }
  };  

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {requireConfirmation && (
          <div className="py-4">
            <Input
              placeholder='Type "DELETE" to confirm'
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
            />
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={requireConfirmation && deleteText !== "DELETE"}
          >
            {requireConfirmation ? "Delete" : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}