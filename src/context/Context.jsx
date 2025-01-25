import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput("");
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    try {
      if (prompt !== undefined) {
        setPrevPrompt((prev) => [...prev, prompt]);
        setRecentPrompt(prompt);
        response = await run(prompt);
      } else {
        setPrevPrompt((prev) => [...prev, input]);
        setRecentPrompt(input);
        response = await run(input);
      }

      const responseArray = response.split("**");
      let formattedResponse = responseArray
        .map((chunk, index) => (index % 2 === 1 ? `<b>${chunk}</b>` : chunk))
        .join("");
      formattedResponse = formattedResponse.split("*").join("</br>");

      const words = formattedResponse.split(" ");
      words.forEach((word, index) => {
        delayPara(index, `${word} `);
      });
    } catch (error) {
      setResultData(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setInput("");
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    loading,
    resultData,
    onSent,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

// import { createContext, useState } from "react";
// import run from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompt, setPrevPrompt] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");

//   const delayPara = (index, nextWord) => {
//     setTimeout(function () {
//       setResultData((prev) => prev + nextWord);
//     }, 75 * index);
//   };

//   const newChat = () => {
//     setLoading(false);
//     setShowResult(false);
//     setInput("");
//   };

//   const onSent = async (prompt) => {
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
//     setInput("");

//     let response;

//     if (prompt !== undefined) {
//       response = await run(prompt);

//       setRecentPrompt(prompt);
//     } else {
//       setPrevPrompt((prev) => [...prev, input]);
//       setRecentPrompt(input);

//       response = await run(input);
//     }

//     let responseArray = response.split("**");
//     let newResponse = "";

//     for (let i = 0; i < responseArray.length; i++) {
//       if (i == 0 || i % 2 !== 1) {
//         newResponse += responseArray[i];
//       } else {
//         newResponse += "<b>" + responseArray[i] + "</b>";
//       }
//     }

//     let newResponse2 = newResponse.split("*").join("</br>");

//     let newResponseArray = newResponse2.split(" ");

//     for (let i = 0; i < newResponseArray.length; i++) {
//       const nextWord = newResponseArray[i];

//       delayPara(i, nextWord + " ");
//     }

//     setLoading(false);
//     setInput("");
//   };

//   const contextValue = {
//     input,
//     setInput,
//     recentPrompt,
//     setRecentPrompt,
//     prevPrompt,
//     setPrevPrompt,
//     showResult,
//     loading,
//     resultData,
//     onSent,
//     newChat,
//   };

//   return (
//     <Context.Provider value={contextValue}>{props.children}</Context.Provider>
//   );
// };

// export default ContextProvider;
