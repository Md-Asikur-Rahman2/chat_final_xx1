import { useMessageState } from "@/context/MessageContext";
import { IMessage } from "@/context/reducers/interfaces";
import React from "react";
import dynamic from "next/dynamic";
import { ChatSkeleton } from "../mychats/ChatSkeleton";
import NotifyMessage from "./typeMessages/NotifyRemoveMessage";
import CallNotify from "./typeMessages/CallNotify";

const TextMessage = dynamic(() => import("./typeMessages/TextMessage"), {
  // loading:()=><ChatSkeleton/>,
  ssr:false
});
const ImageMessage = dynamic(() => import("./typeMessages/ImageMessage"), {
  loading: () => <ChatSkeleton />,
  ssr: false,
});
const VoiceMessage = dynamic(() => import("./typeMessages/VoiceMessage"), {
  loading: () => <ChatSkeleton />,
  ssr: false,
});
const PdfMessage = dynamic(() => import("./typeMessages/PdfMessage"), {
  loading: () => <ChatSkeleton />,
  ssr: false,
});
const VideoMessage = dynamic(() => import("./typeMessages/VideoMessage"), {
  loading: () => <ChatSkeleton />,
  ssr: false,
});

const MessageCard = ({
  message,
}: {
  message: IMessage;
}) => {
  const { user: currentUser } = useMessageState();
  const isCurrentUserMessage = message?.sender?._id === currentUser?._id;

  return (
    <>
      <div
        className={`flex ${
          isCurrentUserMessage ? "justify-end " : "justify-start"
        } mb-1`} //mb-4 py-10
      >
        <div
          className={`flex items-center ${
            isCurrentUserMessage ? "flex-row-reverse" : "flex-row"
          } space-x-2`}
        >
          {/* Content Here */}
          {message?.type === "text" && (
            <TextMessage
              isCurrentUserMessage={isCurrentUserMessage}
              message={message}
            />
          )}
          {message?.type === "video" && (
            <VideoMessage
              message={message}
              isCurrentUserMessage={isCurrentUserMessage}
            />
          )}
          {message?.type === "audio" && (
            <VoiceMessage
              message={message}
              isCurrentUserMessage={isCurrentUserMessage}
            />
          )}
          {message?.type === "image" && (
            <ImageMessage
              message={message}
              isCurrentUserMessage={isCurrentUserMessage}
            />
          )}
          {message?.type === "application" && (
            <PdfMessage
              message={message}
              isCurrentUserMessage={isCurrentUserMessage}
            />
          )}
        </div>
        {/* call-notify */}
        {message?.type === "call-notify" && (
          <CallNotify
            message={message}
            isCurrentUserMessage={isCurrentUserMessage}
          />
        )}
      </div>{" "}
      {/* group types */}
      {message?.type === "notify" && (
        <NotifyMessage
          message={message}
          isCurrentUserMessage={isCurrentUserMessage}
        />
      )}
    </>
  );
};

export default MessageCard;
