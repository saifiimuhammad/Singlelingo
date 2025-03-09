import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const languages = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "Urdu",
    code: "ur",
  },
  {
    name: "French",
    code: "fr",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const languageSelectorHandler = (language: string): void => {
    navigate(`/learn?language=${language}`);
  };

  return (
    <div className="home h-screen w-full flex items-center justify-center gap-y-8 flex-col px-4 md:px-8">
      <h3 className="text-3xl text-center md:text-5xl font-medium mb-10">
        Welcome, Begin your journey of learning!
      </h3>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {languages.map((language) => (
          <Button
            key={language.code}
            className="text-lg"
            onClick={() => languageSelectorHandler(language.code)}
          >
            {language.name}
          </Button>
        ))}
      </div>
      <h5 className="text-md md:text-2xl font-light text-zinc-400">
        Choose one language from the above.
      </h5>
    </div>
  );
};
export default Home;
