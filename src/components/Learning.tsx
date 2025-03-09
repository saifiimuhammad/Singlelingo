import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { fetchAudio, translateWords } from "@/utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getWordsFailure,
  getWordsRequest,
  getWordsSuccess,
} from "@/redux/slices";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>("");

  const { loading, words, error } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const params = useSearchParams()[0].get("language") as LangType;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const audioHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!;
    if (player) player.play();
    else {
      if (params === "ur") {
        const audio = await fetchAudio(words[count]?.meaning, params);
        setAudioSrc(audio);
      } else {
        const audio = await fetchAudio(words[count]?.word, params);
        setAudioSrc(audio);
      }
    }
  };

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc("");
  };

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params)
      .then((arr) => dispatch(getWordsSuccess(arr)))
      .catch((err) => dispatch(getWordsFailure(err)));

    if (error) {
      alert(error);
      dispatch(clearState());
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <div className=" mx-auto h-screen w-max flex items-start justify-center gap-y-2 flex-col">
      {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef} />}
      <Button
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
      >
        &#8592;
      </Button>
      <h5 className="text-sm font-light text-zinc-400 mt-8">
        Learning made simple.
      </h5>
      <div className="flex items-end justify-center gap-x-2">
        <h3 className="text-2xl">
          {count + 1}. {words[count]?.word}
        </h3>
        <h3 className="text-lg font-light">: {words[count]?.meaning}</h3>
        <Button variant="ghost" className="rounded-full" onClick={audioHandler}>
          &#128266;
        </Button>
      </div>
      <Button
        className="mt-12 w-full"
        onClick={
          count === words.length - 1 ? () => navigate("/quiz") : nextHandler
        }
      >
        {count === words.length - 1 ? "Test yourself" : "Next Word"}
      </Button>
    </div>
  );
};
export default Learning;
