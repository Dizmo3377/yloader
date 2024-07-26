import { Button, Input, Space } from "antd";
import { useStore } from "../app/stores/store";
import { useState } from "react";
import { observer } from "mobx-react-lite";

export default observer(function LinkInput() {
  const [link, setLink] = useState("");
  const {
    youtubeStore: { loading, getVideoData },
  } = useStore();

  async function findVideo() {
    await getVideoData(link);
  }

  return (
    <Space.Compact size="large" style={{ width: "50%", marginTop: "50px" }}>
      <Input onChange={(e) => setLink(e.target.value)} placeholder="Input YouTube video link..." />
      <Button onClick={findVideo} loading={loading}>
        Find
      </Button>
    </Space.Compact>
  );
});
