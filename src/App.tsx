import { useDispatch } from "react-redux";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Button } from "./components/ui/button";
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from "./redux/features/counter/counterSlice";
import { useAppSelector } from "./redux/hook";
import { useGetAllBooksQuery } from "./redux/services/book";
import Navbar from "./components/layout/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import { BookListTable } from "./components/table/BookList";
import { BookMutationDialog } from "./components/dialog/bookMutationDialog";
import { Outlet } from "react-router";
import { Footer } from "./components/layout/Footer";

function App() {
  const count = useAppSelector(selectCount);
  const dispatch = useDispatch();
  // const { data, isLoading, isError } = useGetAllBooksQuery(undefined);
  // console.log(data);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      {/* <BookListTable />
      <br />
      <BookMutationDialog mode="create" /> */}
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
