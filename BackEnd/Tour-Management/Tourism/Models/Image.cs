using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tourism.Models
{
    public class Image
    {
        public int ImageId { get; set; }
        public int SpotId { get; set; }
        [ForeignKey("SpotId")]
        [JsonIgnore]
        public Spot? Spots { get; set; }
        public string? ImagePath { get; set; }
    }
}
