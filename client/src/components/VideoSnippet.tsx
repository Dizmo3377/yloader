import { Card, Col, Row, Typography } from "antd";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";

const { Title, Text } = Typography;

export default observer(function VideoSnippet() {
  const {
    youtubeStore: { video },
  } = useStore();

  return (
    video !== undefined && (
      <Card style={{ marginTop: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <img
              alt={video?.title}
              src={video?.image}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Col>
          <Col xs={24} sm={16}>
            <Title level={4} style={{ margin: 0 }}>
              {video?.title}
            </Title>
            <Text type="secondary">{video?.author}</Text>
          </Col>
        </Row>
      </Card>
    )
  );
});
