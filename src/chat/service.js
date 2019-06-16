import { StreamChat } from "stream-chat";
import config from "./config";

const tokenServerUrl = "http://localhost:8080/v1/token";
const chatClient = new StreamChat(config.API_KEY);
const streamServerFlag = "streamServerInfo";
let isClientReady = localStorage.getItem(streamServerFlag) !== null;

export const initialiseClient = async (email, name) => {
  if (isClientReady) return chatClient;

  const response = await fetch(tokenServerUrl, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      name
    })
  });

  const streamServerInfo = await response.json();
  localStorage.setItem(streamServerFlag, JSON.stringify(streamServerInfo));

  chatClient.setUser(
    {
      id: streamServerInfo.user.id,
      name: streamServerInfo.user.name,
      image: streamServerInfo.user.image
    },
    streamServerInfo.token
  );

  isClientReady = true;
  return { chatClient, user: { ...streamServerInfo.user } };
};

export const getClient = () => {
  const streamServerInfo = JSON.parse(localStorage.getItem(streamServerFlag));
  chatClient.setUser(
    {
      id: streamServerInfo.user.id,
      name: streamServerInfo.user.name,
      image: streamServerInfo.user.image
    },
    streamServerInfo.token
  );

  return { chatClient, user: { ...streamServerInfo.user } };
};
export const isClientInitialised = () => isClientReady;

export const resetClient = () => {
  localStorage.removeItem(streamServerFlag);
};
