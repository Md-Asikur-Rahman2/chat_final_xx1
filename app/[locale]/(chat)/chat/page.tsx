import React from "react";
// import LeftSideClientWrapper from "../components/LeftSide";
// import EmptyChat from "../components/Empty";
// import MainClientWrapper from "../components/Main";
// import PrefetchMyChats from "../components/mychats/PrefetchChats";
// import PrefetchMessages from "../components/messages/PrefetchMessages";
import dynamic from "next/dynamic";
import LoaderComponent from "@/components/Loader";

const LeftSideClientWrapper = dynamic(() => import("../components/LeftSide"), {
  loading: () => <LoaderComponent text="Fetching..." />,
});
const EmptyChat = dynamic(() => import("../components/Empty"), {
  loading: () => <LoaderComponent text="Fetching..."/>,
});

const PrefetchMyChats = dynamic(() => import("../components/mychats/PrefetchChats"), {
  loading: () => <LoaderComponent text="Fetching..." />,
});

// const MainClientWrapper = dynamic(() => import("../components/Main"), {
//   loading: () => <LoaderComponent />,
// });
// const PrefetchMessages = dynamic(
//   () => import("../components/messages/PrefetchMessages"),
//   {
//     loading: () => <LoaderComponent />,
//   }
// );
// Now you can use these components as usual, but they will be loaded lazily.

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <>
      <div className="flexBetween gap-2 overflow-hidden">
        {/* Left side */}
        <div
          className={`h-[91vh] md:h-[88vh] basis-[100%]  w-full md:basis-3/6 border `}
        >
          <LeftSideClientWrapper>
            <PrefetchMyChats />
          </LeftSideClientWrapper>
        </div>
        {/* Rightside */}
        <div
          className={`h-screen hidden md:block md:h-[88vh] border w-full `}
        >
          {/* {searchParams?.chatId ? (
            <MainClientWrapper>
              <PrefetchMessages chatId={searchParams?.chatId as string} />
            </MainClientWrapper>
          ) : (
            <EmptyChat />
          )} */}
          <EmptyChat />
        </div>
      </div>
    </>
  );
};

export default page;
