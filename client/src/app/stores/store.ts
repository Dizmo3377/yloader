import { createContext, useContext } from "react";
import YoutubeStore from "./youtubeStore";

interface Store {
  youtubeStore: YoutubeStore;
}

export const store: Store = {
  youtubeStore: new YoutubeStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
