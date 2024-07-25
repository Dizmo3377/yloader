import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Video } from "../models/video";

export default class YoutubeStore {
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  getVideoData = async (id: string): Promise<Video | undefined> => {
    this.setLoading(true);
    try {
      const result = await agent.Youtube.details(id);
      this.setLoading(false);
      return result as Video;
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  downloadVideo = async (id: string, format: string) => {
    this.setLoading(true);
    try {
      const { videoLink } = await agent.Youtube.download(id, format);

      //Add format check in next commit

      if (!videoLink) {
        console.error("Download URL not found");
        this.setLoading(false);
        return;
      }

      window.open(videoLink, "_blank");

      this.setLoading(false);
    } catch (error) {
      console.error("Download error:", error);
      this.setLoading(false);
    }
  };
}
