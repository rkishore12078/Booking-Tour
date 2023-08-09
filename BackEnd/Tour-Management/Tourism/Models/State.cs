using System;
using System.Collections.Generic;

namespace Tourism.Models
{
    public partial class State
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int CountryId { get; set; }
        public string CountryCode { get; set; } = null!;
        public string CountryName { get; set; } = null!;
        public string StateCode { get; set; } = null!;
        public string? Type { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
