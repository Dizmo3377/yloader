import { Image } from "antd";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function VideoSnippet() {
  const {
    youtubeStore: { video },
  } = useStore();

  return (
    video !== undefined && (
      <div style={{ display: "contents", flexDirection: "row" }}>
        <Image width="250px" src={video?.image}></Image>
        <div style={{ flexDirection: "column" }}>
          <p>{video?.title}</p>
          <p>{video?.author}</p>
        </div>
      </div>
    )
  );
});
