using Application.Core;
using MediatR;
using YoutubeExplode;
using YoutubeExplode.Videos.Streams;

namespace Application.Youtube;

public class Download
{

    public class Query : IRequest<Result<DownloadDto>>
    {
        public string Id { get; set; }
        public string Format { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<DownloadDto>>
    {
        private static readonly YoutubeClient youtube = new YoutubeClient();

        public async Task<Result<DownloadDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Format))
                return Result<DownloadDto>.Failure("Format parameter is required.");

            var video = await youtube.Videos.GetAsync(request.Id);
            var streamManifest = await youtube.Videos.Streams.GetManifestAsync(video.Id);

            var videoStreamInfo = (request.Format == "mp3") ? null : streamManifest
                .GetMuxedStreams()
                .FirstOrDefault(s => s.VideoQuality.Label == request.Format);

            var audioStreamInfo = streamManifest
                .GetAudioOnlyStreams()
                .GetWithHighestBitrate();

            if (audioStreamInfo == null)
                return Result<DownloadDto>.Failure("The requested audio stream is not available.");
            if (request.Format != "mp3" && videoStreamInfo == null)
                return Result<DownloadDto>.Failure("The requested video stream is not available.");

            DownloadDto result = new DownloadDto
            {
                VideoLink = videoStreamInfo?.Url,
                AudioLink = audioStreamInfo?.Url
            };

            return Result<DownloadDto>.Success(result);
        }
    }
}