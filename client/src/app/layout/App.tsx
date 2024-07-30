import styles from "./App.module.css";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

import { observer } from "mobx-react-lite";
import YoutubeLoader from "../../components/YoutubeLoader";
import HistoryDrawer from "../../components/HistoryDrawer";

export default observer(function App() {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <HistoryDrawer />
        YLoader
      </Header>
      <Content className={styles.content}>
        <YoutubeLoader />
      </Content>
      <Footer className={styles.footer}>
        YLoader © {new Date().getFullYear()} Created by{" "}
        <a href="https://github.com/Dizmo3377">Dmytro Zozulia</a>
      </Footer>
    </Layout>
  );
});
