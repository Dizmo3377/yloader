import { Button, Dropdown, MenuProps, Space, Typography } from "antd";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";

const { Text } = Typography;

export default observer(function DownloadButton() {
  const {
    youtubeStore: { video, downlaodLoading, downloadVideo },
  } = useStore();

  const items: MenuProps["items"] = video?.formats.map((format) => ({
    key: format,
    label: format,
  }));

  return (
    video !== undefined && (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Dropdown
          menu={{
            items,
            onClick: (e) => downloadVideo(video, e.key),
          }}
          trigger={["click"]}
        >
          <Button
            type="primary"
            size="large"
            loading={downlaodLoading}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Space>
              <Text style={{ color: "#fff" }}>Download Formats</Text>
            </Space>
          </Button>
        </Dropdown>
      </div>
    )
  );
});
