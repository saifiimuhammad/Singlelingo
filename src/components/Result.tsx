import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "@/redux/slices";
import { countMatchingElements } from "@/utils/features";
import { useEffect, useRef } from "react";
import { supabase } from "@/db/db";

const Result = () => {
  const params = useSearchParams()[0].get("language") as LangType;

  const { words, result } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const correctAns = countMatchingElements(
    words.map((i) => i.meaning),
    result
  );
  const percentage = Math.floor((correctAns / words.length) * 100);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasSavedResult = useRef(false);

  const handleBackNavigation = () => {
    navigate("/");
    dispatch(clearState());
  };

  const setLang = (lang: LangType): string => {
    switch (lang) {
      case "hi":
        return "hindi";
      case "ur":
        return "urdu";
      case "ja":
        return "japanese";
      case "fr":
        return "french";
      case "es":
        return "spanish";
      default:
        return "english";
    }
  };

  const addResult = async () => {
    if (hasSavedResult.current) return;
    hasSavedResult.current = true;

    const user = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("Result")
        .insert([
          {
            status: percentage > 60,
            percentage: percentage,
            answers: result,
            correct_answers: words.map((word) => word.meaning),
            language: setLang(params),
          },
        ])
        .select();
      if (error) throw error;
    } else {
      console.log("User is not logged in");
    }
  };

  useEffect(() => {
    addResult();
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col lg:flex-row lg:gap-x-8 lg:px-12">
      <div className="mt-54 md:mt-32 flex items-center justify-center w-full h-full">
        <div className="mt-16 w-full flex items-center justify-center flex-col gap-y-8 py-12 px-4 lg:px-32 rounded-none lg:rounded-[50px] bg-zinc-800 text-white">
          <h1 className="text-5xl font-medium pt-12">Your Results</h1>
          <h4 className="text-xl font-light text-zinc-500">
            You got {correctAns} right out of {words?.length}
          </h4>
          <div className="flex items-start justify-center gap-x-4">
            <div className="flex flex-col items-center justify-center gap-y-2">
              <h1 className="text-5xl font-medium">{percentage}%</h1>
              <h4 className="text-xl font-light text-zinc-500">Correct</h4>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-2">
              <h1 className="text-5xl font-medium">
                {words.length - correctAns}
              </h1>
              <h4 className="text-xl font-light text-zinc-500">Incorrect</h4>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col gap-y-4">
            <h3
              className="text-3xl"
              style={{
                color: percentage > 60 ? "green" : "red",
              }}
            >
              {percentage > 60 ? "Passed" : "Failed"}
            </h3>
            <Button
              onClick={handleBackNavigation}
              variant="ghost"
              style={{
                cursor: "pointer",
              }}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-0 flex items-center md:items-start justify-center flex-col md:flex-row gap-y-4 md:gap-x-32 w-full">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="text-3xl">Your Answers</h1>
          <div className="flex flex-col items-start justify-center gap-y-2">
            {result.map((word, index) => (
              <h1 className="text-xl font-light text-zinc-500" key={index}>
                {index + 1}. {word}
              </h1>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="text-3xl">Correct Answers</h1>
          <div className="flex flex-col items-start justify-center gap-y-2">
            {words.map((word, index) => (
              <h1 className="text-xl font-light text-zinc-500" key={index}>
                {index + 1}. {word.meaning}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Result;
