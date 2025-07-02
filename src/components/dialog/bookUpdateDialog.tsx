import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IBook, IBookWithoutId } from "@/interfaces/Ibook";
import { Edit3 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { BookSelection } from "../select/BookSelection";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useUpdateBookMutation } from "@/redux/services/book";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  book: IBook;
}

const genereList = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

// interface updateBookType {
//   bookData: IBook;
//   id: string;
// }

export function BookUpdateDialog({ book }: Props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<IBookWithoutId>({
    defaultValues: {
      ...book,
    },
  });
  const [updateBook, { data, isLoading, isError }] = useUpdateBookMutation();
  const onSubmit: SubmitHandler<IBookWithoutId> = async (formData) => {
    // console.log("clik");
    // console.log("formData", formData);
    const res = await updateBook({ bookData: formData, id: book._id }).unwrap();
    if (res.success) {
      toast.success("Book updated successfully!");
      setOpen(false);
    }
  };
  const selectedGenre = watch("genre");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit3 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input {...register("title")} id="title" name="title" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="author">Author</Label>
              <Input {...register("author")} id="author" name="author" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                id="description"
                name="description"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                {...register("isbn")}
                type="number"
                id="isbn"
                name="isbn"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="copies">Copies</Label>
              <Input
                {...register("copies")}
                type="number"
                id="copies"
                name="copies"
              />
            </div>
          </div>
          <div className="grid gap-3">
            <Label>Select a genre</Label>
            <BookSelection
              genre={selectedGenre}
              genreList={genereList}
              onChange={(val) =>
                setValue("genre", val, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
          </div>
          <Input type="hidden" id="genre" {...register("genre")} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
