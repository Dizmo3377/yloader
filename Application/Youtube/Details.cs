using Application.Core;
using MediatR;
using YoutubeExplode;
using YoutubeExplode.Common;
using YoutubeExplode.Videos;

namespace Application.Youtube;

public class Details
{
    public class Query : IRequest<Result<VideoDto>>
    {
        public string Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<VideoDto>>
    {
        private static readonly YoutubeClient youtube = new YoutubeClient();

        public async Task<Result<VideoDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var video = await youtube.Videos.GetAsync(request.Id);

            if (video == null) return null;

            var videoFormats = GetVideoFormats(video);

            VideoDto videoDto = new VideoDto
            {
                Image = video.Thumbnails.GetWithHighestResolution().Url,
                Title = video.Title,
                Author = video.Author.ChannelTitle,
                Formats = await videoFormats,
            };

            return Result<VideoDto>.Success(videoDto);
        }

        private async Task<ICollection<string>> GetVideoFormats(Video video)
        {
            var streamManifest = await youtube.Videos.Streams.GetManifestAsync(video.Id);
            var videoStreams = streamManifest.GetMuxedStreams();

            HashSet<string> formats = new HashSet<string>();

            foreach (var stream in videoStreams)
            {
                formats.Add(stream.VideoQuality.Label);
            }

            formats.Add("mp3");

            return formats;
        }
    }
}