import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/interfaces/Ibook";
import { useGetAllBooksQuery } from "@/redux/services/book";
import { BookMutationDialog } from "../dialog/bookMutationDialog";
import Loader from "../loader/Loader";
import { DeleteAlertDialog } from "../dialog/alertDialog";
import { BorrowDialog } from "../dialog/borrowDialog";
interface Props {
  bookMutation?: boolean;
  title?: string;
}
export function BookListTable({ title, bookMutation }: Props) {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetAllBooksQuery(undefined);

  return (
    <div>
      <h1 className="text-3xl text-center m-10">
        {title ? title : "Choose Your Book! "}
      </h1>
      <div className="flex justify-end">
        {bookMutation ? <BookMutationDialog mode="create" /> : ""}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availablity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {response &&
              response.data.map((book: IBook) => (
                <TableRow key={book._id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.copies}</TableCell>
                  <TableCell>
                    {book.available ? "Available" : "Unavailable"}
                  </TableCell>
                  <TableCell className="flex gap-4">
                    {/* <Edit /> */}
                    <BorrowDialog
                      isAvailable={book.available}
                      refetch={refetch}
                      id={book._id}
                    />
                    <BookMutationDialog mode="view" book={book} />
                    <BookMutationDialog mode="update" book={book} />
                    <DeleteAlertDialog id={book._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      )}
    </div>
  );
}
