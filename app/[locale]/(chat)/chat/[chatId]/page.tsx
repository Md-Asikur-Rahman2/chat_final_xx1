import React from "react";
// import LeftSideClientWrapper from "../../components/LeftSide";
import PrefetchMyChats from "../../components/mychats/PrefetchChats";
// import MainClientWrapper from "../../components/Main";
// import PrefetchMessages from "../../components/messages/PrefetchMessages";
// import EmptyChat from "../../components/Empty";
import dynamic from "next/dynamic";
import LoaderComponent from "@/components/Loader";
import Navbar from "@/components/Navbar";

const LeftSideClientWrapper = dynamic(() => import("../../components/LeftSide"), {
  loading: () => <LoaderComponent />,
});
// const PrefetchMyChats = dynamic(() => import("../../components/mychats/PrefetchChats"), {
//   loading: () => <LoaderComponent />,
// });
const MainClientWrapper = dynamic(() => import("../../components/Main"), {
  loading: () => <LoaderComponent />,
});
const PrefetchMessages = dynamic(
  () => import("../../components/messages/PrefetchMessages"),
  {
    loading: () => <LoaderComponent />,
  }
);
const EmptyChat = dynamic(() => import("../../components/Empty"), {
  loading: () => <LoaderComponent />,
});

// Now you can use these components as usual, but they will be loaded lazily.

const page = ({ params }: { params: { chatId: string } }) => {
  return (
    <div>
      {/* {!params?.chatId && <Navbar />} */}
      <div className="flexBetween gap-2 overflow-hidden">
        {/* Left side */}
        <div
          className={`h-screen ${!params?.chatId?"md:h-[88vh]":"h-screen"} basis-[100%] ${
            params?.chatId ? "hidden" : "block"
          } md:block w-full md:basis-2/4 border `}
        >
          <LeftSideClientWrapper>
            <PrefetchMyChats />
          </LeftSideClientWrapper>
        </div>
        {/* Rightside */}
        <div
          className={`h-screen w-full`}
        >
          {params?.chatId ? (
            <MainClientWrapper>
              <PrefetchMessages chatId={params?.chatId as string} />
            </MainClientWrapper>
          ) : (
            <EmptyChat />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
