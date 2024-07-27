import { useState } from "react";
import { Button, Drawer, List } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";

export default observer(function HistoryDrawer() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { youtubeStore } = useStore();

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <>
      <Button type="primary" icon={<MenuUnfoldOutlined />} onClick={toggleDrawer} />
      <Drawer title="Download History" placement="left" onClose={toggleDrawer} open={drawerVisible}>
        <List
          dataSource={youtubeStore.getDownloadHistory()}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={
                  item.image && (
                    <img src={item.image} alt={item.title} style={{ maxWidth: "100px" }} />
                  )
                }
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
});
