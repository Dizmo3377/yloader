import { Button, Dropdown, MenuProps, Space } from "antd";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function DownloadButton({}) {
  const {
    youtubeStore: { video, downloadVideo },
  } = useStore();

  const items: MenuProps["items"] = video?.formats.map((format) => ({
    key: format,
    label: format,
  }));

  return (
    video !== undefined && (
      <Dropdown
        menu={{ items, onClick: (e) => downloadVideo(video.id, e.key) }}
        trigger={["click"]}
      >
        <Button>
          <Space>Download Formats</Space>
        </Button>
      </Dropdown>
    )
  );
});
