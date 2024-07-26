import DownloadButton from "./DownloadButton";
import ErrorMessage from "./ErrorMessage";
import LinkInput from "./LinkInput";
import VideoSnippet from "./VideoSnippet";

export default function YoutubeLoader() {
  return (
    <>
      <LinkInput />
      <ErrorMessage />
      <VideoSnippet />
      <DownloadButton />
    </>
  );
}
