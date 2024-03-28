import { IMessage } from "@/context/reducers/interfaces";
import React from "react";
import dynamic from 'next/dynamic';

const ImageFile = dynamic(() => import('./type/ImageFile'));
const VideoFile = dynamic(() => import('./type/Video'));
const Pdf = dynamic(() => import('./type/Pdf'));
const AudioFile = dynamic(() => import('./type/Audio'));

const Card = ({ message }: { message: IMessage }) => {
  return (
    <div>
      {message.type === "image" && <ImageFile message={message} />}
      {message.type === "video" && <VideoFile message={message} />}
      {message.type === "audio" && <AudioFile message={message} onPreview={false} />}
      {message.type === "application" && <Pdf message={message} />}
    </div>
  );
};

export default Card;
