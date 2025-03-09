import axios from "axios";
import _ from "lodash";
import { generate } from "random-words";

// Generate random options for the given word
const generateMCQ = (meaning: { text: string }[], idx: number): string[] => {
  const correctAns = meaning[idx].text;
  const allMeaningExceptCorrect = meaning.filter((i) => i.text !== correctAns);
  const incorrectAns = _.sampleSize(allMeaningExceptCorrect, 3).map(
    (i) => i.text
  );

  const mcqOptions = _.shuffle([...incorrectAns, correctAns]);

  return mcqOptions;
};

export const translateWords = async (params: LangType): Promise<WordType[]> => {
  try {
    const words: { text: string }[] = (generate(8) as string[]).map(
      (word: string) => ({
        text: word,
      })
    );

    const rapidKey = import.meta.env.VITE_RAPID_API;

    const response = await axios.post(
      "https://microsoft-translator-text-api3.p.rapidapi.com/translate",
      words,
      {
        params: {
          to: params,
          from: "en",
          textType: "plain",
        },
        headers: {
          "x-rapidapi-key": rapidKey,
          "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );

    const recieve: FetchedDataType[] = response.data;

    const arr: WordType[] = recieve.map((i, idx) => {
      const options: string[] = generateMCQ(words, idx);
      return {
        word: i.translations[0].text,
        meaning: words[idx].text,
        options,
      };
    });

    return arr;
  } catch (error) {
    console.log(error);
    throw new Error("Some error occurred!");
  }
};

export const countMatchingElements = (
  words: string[],
  result: string[]
): number => {
  if (words.length !== result.length) throw new Error("Arrays are not equal!");

  let matchingCount = 0;

  for (let i = 0; i < words.length; i++) {
    if (words[i] === result[i]) matchingCount++;
  }

  return matchingCount;
};

export const fetchAudio = async (
  text: string,
  language: LangType
): Promise<string> => {
  const key = import.meta.env.VITE_TTS_API;
  const rapidKey = import.meta.env.VITE_RAPID_API;

  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });

  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else encodedParams.set("hl", "hi-in");

  const { data }: { data: string } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: {
        key,
      },
      headers: {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return data;
};
