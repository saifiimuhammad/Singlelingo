import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { saveResult } from "@/redux/slices";

const Quiz = () => {
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");

  const { words } = useSelector((state: { root: StateType }) => state.root);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const nextHandler = (): void => {
    setResult((prev) => [...prev, ans]);
    setCount((prev) => prev + 1);
    setAns("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (count + 1 > words.length) navigate("/result");
    dispatch(saveResult(result));
  }, [result]);

  return (
    <div className="mx-auto h-screen w-max flex items-start justify-center gap-y-2 flex-col">
      <h5 className="text-sm font-light text-zinc-400">Quiz</h5>

      <div className="flex items-end justify-center gap-x-2 my-8">
        <h3 className="text-lg font-light">{count + 1}.</h3>
        <h3 className="text-2xl">{words[count]?.word}</h3>
      </div>
      <form onSubmit={onSubmit} className="w-full space-y-6">
        <div className="space-y-3">
          <label className="block font-medium">means...</label>
          <div className="flex flex-col space-y-1">
            {words[count]?.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={option}
                  value={option}
                  checked={ans === option}
                  onChange={(e) => setAns(e.target.value)}
                />
                <span className="font-normal">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <Button
          className="mt-12 w-full"
          type="button"
          onClick={nextHandler}
          disabled={ans === ""}
        >
          {count === words.length - 1 ? "Test your score" : "Next"}
        </Button>
      </form>
    </div>
  );
};

export default Quiz;
