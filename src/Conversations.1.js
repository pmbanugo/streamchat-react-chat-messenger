import React from "react";
import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelList, Window } from "stream-chat-react";
import { ChannelHeader, MessageList } from "stream-chat-react";
import { MessageInput, Thread } from "stream-chat-react";
// import { getClient } from "./chat/service";

import "stream-chat-react/dist/css/index.css";

const chatClient = new StreamChat("qk4nn7rpcn75");
const userToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiam9sbHktY2hlcnJ5LTAifQ.ExfXNelZw7SUrrVtRlTnn-tVtM78dmBSC9HR483Ls84";

chatClient.setUser(
  {
    id: "jolly-cherry-0",
    name: "Jolly cherry",
    image:
      "https://getstream.io/random_svg/?id=jolly-cherry-0&name=Jolly+cherry"
  },
  userToken
);

const filters = { type: "messaging" };
const sort = { last_message_at: -1 };

// chatClient
//   .queryUsers({ id: { $ne: "jolly-cherry-0" } })
//   .then(x => console.log("success querying users") || console.log(x))
//   .catch(console.error);

// const App = async () => {
//   // const {chatClient} = await getClient();

//   return (
//     <Chat client={chatClient} theme={"messaging light"}>
//       <ChannelList filters={filters} sort={sort} />
//       <Channel>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput />
//         </Window>
//         <Thread />
//       </Channel>
//     </Chat>
//   );
// };

const App = async () => (
  <Chat client={chatClient} theme={"messaging light"}>
    <ChannelList filters={filters} sort={sort} />
    <Channel>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default App;
