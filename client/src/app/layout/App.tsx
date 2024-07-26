import styles from "./App.module.css";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

import { observer } from "mobx-react-lite";
import YoutubeLoader from "../../components/YoutubeLoader";

export default observer(function App() {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>YLoader</Header>
      <Content className={styles.content}>
        <YoutubeLoader />
      </Content>
      <Footer className={styles.footer}>
        YLoader ©{new Date().getFullYear()} Created by Dmytro Zozulia
      </Footer>
    </Layout>
  );
});
