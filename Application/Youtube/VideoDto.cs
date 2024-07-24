namespace Application.Youtube;

public class VideoDto
{
    public string Title { get; set; }
    public string Image { get; set; }
    public string Author { get; set; }
    public ICollection<string> Formats { get; set; }
}