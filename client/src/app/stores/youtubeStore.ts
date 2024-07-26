import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Video } from "../models/video";

export default class YoutubeStore {
  loading = false;
  error = "";
  video: Video | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  private setVideo = (video: Video) => {
    this.video = video;
  };

  private setError = (state: string) => {
    this.error = state;
  };

  private extractYoutubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  private setLoading = (state: boolean) => {
    this.loading = state;
  };

  getVideoData = async (link: string) => {
    this.setLoading(true);

    runInAction(async () => {
      let id = this.extractYoutubeId(link);
      if (id == null) {
        this.setLoading(false);
        this.setError("Invalid youtube link");
        return;
      }

      const result = (await agent.Youtube.details(id)) as Video;
      result.id = id;
      this.setVideo(result);
      this.setLoading(false);
      this.setError("");
    });
  };

  downloadVideo = async (id: string, format: string) => {
    runInAction(async () => {
      const { videoLink, audioLink } = await agent.Youtube.download(id, format);

      if (!videoLink && !audioLink) {
        this.setError("Error while gettng download links");
        return;
      }

      window.open(!videoLink ? audioLink : videoLink, "_blank");
    });
  };
}
