using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tourism.Models
{
    public class Spot
    {
        public int SpotId { get; set; }
        public int CountryId { get; set; }
        [ForeignKey("CountryId")]
        [JsonIgnore]
        public Country? Countries { get; set; }
        public int StateId { get; set; }
        [ForeignKey("StateId")]
        [JsonIgnore]
        public State? State { get; set; }
        public int CityId { get; set; }
        [ForeignKey("CityId")]
        [JsonIgnore]
        public City? Cities { get; set; }
        public string? SpotName { get; set; }

        public ICollection<Speciality>? Specialities { get; set; }  
        public ICollection<Image>? Images { get; set; }
    }
}
