import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";

export default observer(function ErrorMessage() {
  const {
    youtubeStore: { error },
  } = useStore();

  return <p style={{ color: "red" }}>{error}</p>;
});
