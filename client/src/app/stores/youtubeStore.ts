import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Video } from "../models/video";
import { DownloadLog } from "../models/downloadLog";

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

  private setLoading = (state: boolean) => {
    this.loading = state;
  };

  private extractYoutubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  private saveToLocalStorage = (log: DownloadLog) => {
    localStorage.setItem(
      `YL_DOWNLOAD_LOG_${crypto.randomUUID().substring(0, 8)}`,
      JSON.stringify(log)
    );
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

  downloadVideo = async (video: Video, format: string) => {
    runInAction(async () => {
      const { videoLink, audioLink } = await agent.Youtube.download(video.id, format);

      if (!videoLink && !audioLink) {
        this.setError("Error while gettng download links");
        return;
      }

      this.saveToLocalStorage({ image: video.image, title: video.title });
      window.open(!videoLink ? audioLink : videoLink, "_blank");
    });
  };

  getDownloadHistory = (): DownloadLog[] => {
    const logs: DownloadLog[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("YL_DOWNLOAD_LOG_")) {
        const log = localStorage.getItem(key);
        if (log) {
          logs.push(JSON.parse(log));
        }
      }
    }
    return logs;
  };
}
