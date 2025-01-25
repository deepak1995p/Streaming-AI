import React, { useContext } from "react";
import {
  FaCode,
  FaCompass,
  FaLightbulb,
  FaMicrophone,
  FaUserCircle,
  FaPlus,
  FaRegPlusSquare,
} from "react-icons/fa";
import { FaMessage, FaPlugCirclePlus } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "../context/Context";
import geminiLogo from "../assets/geminiLogo.png";
import coPilotLogo from "../assets/copilot-icon.svg";
import user from "../assets/dipansu.jpg";

import {
  useChatInteract,
  useChatMessages,
  IStep,
} from "@chainlit/react-client";
import { useMemo, useState } from "react";

function flattenMessages(
  messages: IStep[],
  condition: (node: IStep) => boolean
): IStep[] {
  return messages.reduce((acc: IStep[], node) => {
    if (condition(node)) {
      acc.push(node);
    }

    if (node.steps?.length) {
      acc.push(...flattenMessages(node.steps, condition));
    }
    return acc;
  }, []);
}

const MainContent = () => {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChatInteract();
  const { messages } = useChatMessages();

  const flatMessages = useMemo(() => {
    return flattenMessages(messages, (m) => m.type.includes("message"));
  }, [messages]);
  console.log("kfjdksfldkf", flatMessages);
  const handleSendMessage = () => {
    const content = inputValue.trim();
    if (content) {
      const message = {
        name: "user",
        type: "user_message" as const,
        output: content,
      };
      sendMessage(message, []);
      setInputValue("");
    }
  };

  const renderMessage = (message: IStep) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(message.createdAt).toLocaleTimeString(
      undefined,
      dateOptions
    );
    return (
      <p key={message.id}>
        {message.output}
        {/* <div className="w-20 text-sm text-green-500">{message.name}</div>
        <div className="flex-1 border rounded-lg p-2">
          <p className="text-black dark:text-white">{message.output}</p>
          <small className="text-xs text-gray-500">{date}</small>
        </div> */}
      </p>
    );
  };
  const {
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
  } = useContext(Context);

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      <div className="flex items-center justify-between text-xl p-5 text-slate-700">
        <p className="font-bold flex items-center">
          <img src={coPilotLogo} alt="coPilotLogo" className="me-3 w-12 h-12" />
          Matchmaker
        </p>
        <img
          className="w-[40px] h-[40px] rounded-full me-3"
          src={user}
          alt="user"
        />
        {/* <div
          onClick={() => newChat()}
          className="mt-[10px] inline-flex items-center gap-[10px] py-[5px] px-[18px] text-[16px] text-gray-500 cursor-pointer rounded-[5px] font-bold border-2"
        >
          <FaPlus className="text-[16px]" />
          <p>New chat</p>
        </div> */}
        {/* <img
          src={user}
          alt="User"
          className="rounded-[50%] w-[50px] h-[50px]"
        /> */}
        {/* <FaUserCircle className="text-[32px]" /> */}
      </div>

      <div className="max-w-[1080px] mx-auto">
        {!showResult && !flatMessages.length ? (
          <>
            <div className="my-12 text-[48px] text-slate-500 font-semibold p-5">
              <p>
                <span className="bg-gradient-to-r from-[#368ddd] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, Deepak Patel.
                </span>
              </p>

              <p className="text-slate-400">How can I help you today?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              <div
                className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  onSent("Suggeset top 10 webseries.");
                }}
              >
                <p className="text-slate-700 text-lg">
                  Suggeset top 10 webseries.
                </p>

                <FaCompass className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>

              <div
                className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  onSent("What is loop in Javascript?");
                }}
              >
                <p className="text-slate-700 text-lg">
                  What is loop in Javascript?
                </p>

                <FaLightbulb className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>

              <div
                className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  onSent("Who is Indian cricket captain?");
                }}
              >
                <p className="text-slate-700 text-lg">
                  Who is Indian cricket captain?
                </p>

                <FaMessage className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>

              <div
                className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  onSent("How to integrate chainlit in react project?");
                }}
              >
                <p className="text-slate-700 text-lg">
                  How to integrate chainlit in react project?
                </p>

                <FaCode className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
              <div className="my-10 mx-0 flex items-center gap-5 justify-end">
                {/* <FaUserCircle className="text-3xl" /> */}
                {/* <img
                  src={user}
                  alt="User"
                  className="rounded-[50%] w-[30px] h-[30px]"
                /> */}
                <p className="text-lg font-[400] leading-[1.8] border-2 rounded-[10px] px-[20px] py-1 align-middle max-w-[700px]">
                  {recentPrompt}
                </p>
              </div>

              <div className="flex items-start gap-5">
                <img src={coPilotLogo} alt="" className="w-8 rounded-[50%]" />

                {loading ? (
                  <div className="w-full flex flex-col gap-2">
                    <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-3 animate-scroll-bg" />

                    <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-3 animate-scroll-bg" />

                    <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-3 animate-scroll-bg" />

                    <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-3 animate-scroll-bg" />
                  </div>
                ) : (
                  <>
                    <div className="border-2 rounded-[15px] p-4 pt-2">
                      {/* <p
                        dangerouslySetInnerHTML={{ __html: resultData }}
                        className="text-lg font-[400] leading-[1.8]"
                      ></p> */}
                      {/* {flatMessages.map((message) => {
                          return (
                            <>
                              <p key={message.id}>{message.output}</p>
                            </>
                          );
                        })} */}
                      {flatMessages.map((message) => renderMessage(message))}
                      {/* <div className="flex gap-4 px-5 mt-4 cardsContainer">
                        <div
                          className="h-[40px] px-4 p-2 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                          onClick={() => {
                            onSent("What is loop in Javascript?");
                          }}
                        >
                          <p className="text-slate-700 text-[14px]">
                            What is loop in Javascript?
                          </p>

                          <FaLightbulb className="text-4xl p-1 absolute bottom-2 right-2" />
                        </div>

                        <div
                          className=" h-[40px] px-4 p-2 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                          onClick={() => {
                            onSent("Who is Indian cricket captain?");
                          }}
                        >
                          <p className="text-slate-700 text-[14px]">
                            Who is Indian cricket captain?
                          </p>

                          <FaMessage className="text-4xl p-1 absolute bottom-2 right-2" />
                        </div>

                        <div
                          className="h-[40px] flex px-4 p-2 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300 border-2"
                          onClick={() => {
                            onSent(
                              "How to integrate chainlit in react project?"
                            );
                          }}
                        >
                          <p className="text-slate-700 text-[14px]">
                            integrate chainlit in react project?
                          </p>

                          <FaCode className="text-4xl p-1 absolute bottom-2 right-2" />
                        </div>
                      </div> */}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        <div className="absolute bottom-0 w-full max-w-[1100px] px-5 mx-auto mt-5">
          {!loading && (
            <div className="flex gap-4 px-5 mt-4 cardsContainer mb-3">
              {/* <div
                  className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                  onClick={() => {
                    onSent("Suggeset top 10 webseries.");
                  }}
                >
                  <p className="text-slate-700 text-lg">
                    Suggeset top 10 webseries.
                  </p>
  
                  <FaCompass className="text-4xl p-1 absolute bottom-2 right-2" />
                </div> */}

              <div
                className="h-[40px] px-4 p-2 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  onSent("What is loop in Javascript?");
                }}
              >
                <p className="text-slate-700 text-[14px]">
                  What is loop in Javascript?
                </p>

                {/* <FaLightbulb className="text-4xl p-1 absolute bottom-2 right-2" /> */}
              </div>

              <div
                className=" h-[40px] px-4 p-2 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  onSent("Who is Indian cricket captain?");
                }}
              >
                <p className="text-slate-700 text-[14px]">
                  Who is Indian cricket captain?
                </p>

                {/* <FaMessage className="text-4xl p-1 absolute bottom-2 right-2" /> */}
              </div>

              <div
                className="h-[40px] flex px-4 p-2 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300 border-2"
                onClick={() => {
                  onSent("How to integrate chainlit in react project?");
                }}
              >
                <p className="text-slate-700 text-[14px]">
                  integrate chainlit in react project?
                </p>

                {/* <FaCode className="text-4xl p-1 absolute bottom-2 right-2" /> */}
              </div>
            </div>
          )}
          <div className="flex items-center justify-between gap-20 bg-gray-200 py-2 px-5 rounded-full">
            <input
              type="text"
              placeholder="Enter a prompt here..."
              className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  onSent();
                }
              }}
            />

            <div className="flex gap-4 items-center">
              <MdAddPhotoAlternate className="text-2xl cursor-pointer" />
              <FaMicrophone className="text-2xl cursor-pointer" />
              {input && (
                <IoMdSend
                  onClick={() => onSent()}
                  className="text-2xl cursor-pointer"
                />
              )}
            </div>
          </div>

          <p className="text-sm my-4 mx-auto text-center font-[500] text-slate-600">
            Matchmaker may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
