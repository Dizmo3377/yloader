using Application.Youtube;
using Microsoft.AspNetCore.Mvc;
using YoutubeExplode;
using YoutubeExplode.Converter;
using YoutubeExplode.Videos.Streams;

namespace API.Controllers;

public class YoutubeController : BaseApiController
{
    private static readonly YoutubeClient youtube = new YoutubeClient();

    [HttpGet("details/{id}")]
    public async Task<IActionResult> GetDetails(string id)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    }

    [HttpGet("download/{id}")]
    public async Task<IActionResult> GetDownlaod(string id, [FromQuery] string format)
    {
        return HandleResult(await Mediator.Send(new Download.Query { Id = id, Format = format}));
    }
}