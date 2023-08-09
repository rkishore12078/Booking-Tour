using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tourism.Models
{
    public class Speciality
    {
        public int SpecialityId { get; set; }
        public int SpotId { get; set; }
        [ForeignKey("SpotId")]
        [JsonIgnore]
        public Spot? Spots { get; set; }
        public string? SpecialityName { get; set; }
    }
}
