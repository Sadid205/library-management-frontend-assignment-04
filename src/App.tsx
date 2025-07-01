import { useDispatch } from "react-redux";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from "./redux/features/counter/counterSlice";
import { useAppSelector } from "./redux/hook";
import { useGetAllBooksQuery } from "./redux/services/book";

function App() {
  const count = useAppSelector(selectCount);
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined);
  console.log(data);
  return (
    <div className="flex flex-col items-center gap-6 min-h-screen justify-center">
      <div className="font-bold text-2xl">{count}</div>
      <div className="gap-6 flex">
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(incrementByAmount(5))}>
          Increment By 5
        </Button>
      </div>
    </div>
  );
}

export default App;
