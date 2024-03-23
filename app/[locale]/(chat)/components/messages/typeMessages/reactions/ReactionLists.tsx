import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMessageState } from "@/context/MessageContext";
import { IMessage } from "@/context/reducers/interfaces";
import { Reaction, ReactionGroup } from "@/store/types";
import { useOnlineUsersStore } from "@/store/useOnlineUsers";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import Image from "next/image";
import React, { Dispatch, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Card from "./Card";
import { BaseUrl } from "@/config/BaseUrl";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";

const ReactionLists = ({
  message,
  messageId,
  reactions,
  reactionsGroup,
  isCurrentUserMessage,
  isOpenReactionListModal,
  setIsOpenReactionListModal,
  handleRemoveReact,
}: {
  message: IMessage;
  messageId: string;
  reactions: Reaction[];
  isCurrentUserMessage: boolean;
  isOpenReactionListModal: boolean;
  setIsOpenReactionListModal: Dispatch<boolean>;
  handleRemoveReact: (messageId: string, reactionId: string) => void;
  reactionsGroup: ReactionGroup[];
}) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { onlineUsers } = useOnlineUsersStore();
  const { user: currentUser, selectedChat } = useMessageState();
  const [activeTab, setActiveTab] = useState("");
  const [page, setpage] = useState(1);
  const [data, setData] = useState<Reaction[]>([]);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  //BEST WILL BE REACT INFINITE SCROLL BASE ON ACTIVE TAB
  useEffect(() => {
    setData(message.reactions);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${BaseUrl}/getMessageReactions/${messageId}?emoji=${activeTab}&page=${page}&limit=10`,
        { credentials: "include" }
      );
      const data = await res.json();
      setData(data);
    };
    if (messageId !== ""&&page===1) {
      fetchData();
    }
  }, [activeTab, messageId]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${BaseUrl}/getMessageReactions/${messageId}?emoji=${activeTab}&page=${page}&limit=10`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setData((prev) => [...prev, data]);
    };
    if (page > 1) {
      fetchData();
    }
  }, [activeTab, page, messageId]);
  const fetchNextPage = () => {
    setpage((prev) => prev + 1);
  };
  // setShowScrollToBottomButton
  useEffect(() => {
    const container = document.getElementById("ReactionScrollableTarget");

    const handleScroll = () => {
      if (container) {
        const { scrollTop } = container;
        //when will scroll top greater than 500px
        setShowScrollToTopButton(scrollTop > 500);
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    // Check initial scroll position
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  //scroll to top
  const scrollToTop = () => {
    const container = document.getElementById("ReactionScrollableTarget"); //containerRef.current will be null and not work

    container?.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      className={`z-50 absolute bottom-4 ${
        !isCurrentUserMessage
          ? isSmallDevice
            ? "-60px min-w-60 -top-52 max-h-[250px]"
            : "-right-[290px]  md:w-[400px]"
          : "right-10   min-w-60"
      } rounded transition-all bg-gray-100 hover:bg-gray-200 dark:bg-gray-800  p-4 md:p-8 duration-500 ${
        isOpenReactionListModal
          ? "translate-y-1 scale-100 opacity-100 w-auto md:w-[400px] max-h-[300px] overflow-y-auto"
          : "translate-y-0 scale-0 opacity-0"
      }`}
    >
      <button
        onClick={() => setIsOpenReactionListModal(false)}
        className="btn float-right "
      >
        <MdClose />
      </button>
      <h1 className="text-sm md:text-3xl p-3 border-b-2 mb-6 border-violet-600">
        Reactions ({message.totalReactions})
      </h1>
      {/* Tab start */}
      <div className="flex gap-2 w-full  overflow-x-auto bg-gray-800">
        <div className="all">
          <div
            onClick={() => setActiveTab("all")}
            className={`p-1  text-[10px] rounded flex gap-1 cursor-pointer hover:animate-pulse duration-200 ${
              activeTab === "" || activeTab === "all" ? "bg-blue-300" : "bg-gray-600"
            }`}
          >
            All
          </div>
          <span className="-mt-2 mx-2 w-full text-gray-300 text-[10px] rounded-lg p bg-gray-700">
            {message.totalReactions}
          </span>
        </div>
        {reactionsGroup &&
          reactionsGroup?.map((emoji, i) => {
            return (
              <div key={i}>
                <div
                  onClick={() => setActiveTab(emoji?._id)}
                  className={`p-1   rounded flex gap-1 cursor-pointer hover:animate-pulse duration-200 ${
                    activeTab === emoji._id ? "bg-blue-300" : "bg-gray-600"
                  }`}
                >
                  <Emoji
                    size={isSmallDevice ? 12 : 16}
                    lazyLoad
                    emojiStyle={EmojiStyle.APPLE}
                    unified={(emoji as any)._id.codePointAt(0).toString(16)}
                  />
                </div>
                <span className="-mt-2 mx-2 w-full text-gray-300 text-[10px] rounded-lg p bg-gray-700">
                  {emoji.count}
                </span>
              </div>
            );
          })}
      </div>
      {/* Tab end */}

      <div
        id="ReactionScrollableTarget"
        className="menu p-2 md:p-4 bg-base-200 h-[100px] overflow-y-auto overflow-x-hidden flex flex-col-reverse"
      >
        <InfiniteScroll
          dataLength={data ? data?.length : 0}
          next={() => {
            fetchNextPage();
          }}
          hasMore={message.totalReactions > data.length&&data.length>=10}
          loader={
            <div className="flex justify-center items-center mt-8">
              <div className="w-9 h-9 border-l-transparent border-t-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          }
          endMessage={
            data.length > 10 && (
              <div className="text-center text-xs text-green-400 pt-10">
                You have viewed all reactions
              </div>
            )
          }
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
          scrollableTarget="ReactionScrollableTarget"
          scrollThreshold={1}
        >
          <div className="flex flex-col  gap-y-2 w-full">
            {data?.map((reaction, i) => {
              return (
                <Card
                  key={reaction._id + Date.now() + Math.random() * 1000}
                  handleRemoveReact={handleRemoveReact}
                  reaction={reaction}
                />
              );
            })}
          </div>
        </InfiniteScroll>
        <Button
          onClick={scrollToTop}
          className={`absolute bottom-0 right-0 ${
            showScrollToTopButton ? "block" : "hidden"
          }`}
        >
          Top
        </Button>
      </div>
    </div>
  );
};

export default ReactionLists;
