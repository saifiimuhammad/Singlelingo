import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

const Loader = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    let timer = setTimeout(() => setProgress(33), 500);
    timer = setTimeout(() => setProgress(87), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full grid place-items-center">
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
};
export default Loader;
