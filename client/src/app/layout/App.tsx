import { useState } from "react";
import "./App.css";
import { Button } from "antd";
import { useStore } from "../stores/store";
import { Video } from "../models/video";
import { observer } from "mobx-react-lite";

export default observer(function App() {
  const [video, setVideo] = useState<Video>();
  const { youtubeStore } = useStore();

  async function testDetails() {
    let video = await youtubeStore.getVideoData("YM9lQUneMsY");
    setVideo(video);
  }

  async function testDownload() {
    await youtubeStore.downloadVideo("YM9lQUneMsY", "360p");
  }

  return (
    <>
      <h1>YLoader</h1>
      <Button loading={youtubeStore.loading} onClick={testDownload}>
        Test
      </Button>
      <p>{video?.title}</p>
    </>
  );
});
