using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using static System.Net.Mime.MediaTypeNames;

namespace Tourism.Models
{
    public partial class dbLocationsContext : DbContext
    {
        public dbLocationsContext()
        {
        }

        public dbLocationsContext(DbContextOptions<dbLocationsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<City> Cities { get; set; } = null!;
        public virtual DbSet<Country> Countries { get; set; } = null!;
        public virtual DbSet<State> States { get; set; } = null!;

        public DbSet<Spot>? Spots { get; set; } = null!;
        public DbSet<Speciality>? Specialities { get; set; } = null!;
        public DbSet<Image>? Images { get; set; } = null!;
//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseSqlServer("Data Source=KISHORE\\SQLEXPRESS;Integrated Security=true;Initial Catalog=dbLocations");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("City");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.CountryCode)
                    .HasMaxLength(50)
                    .HasColumnName("country_code");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.CountryName)
                    .HasMaxLength(50)
                    .HasColumnName("country_name");

                entity.Property(e => e.Latitude).HasColumnName("latitude");

                entity.Property(e => e.Longitude).HasColumnName("longitude");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.StateCode).HasColumnName("state_code");

                entity.Property(e => e.StateId).HasColumnName("state_id");

                entity.Property(e => e.StateName).HasColumnName("state_name");

                entity.Property(e => e.WikiDataId)
                    .HasColumnType("money")
                    .HasColumnName("wikiDataId");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.ToTable("Country");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Capital)
                    .HasMaxLength(50)
                    .HasColumnName("capital");

                entity.Property(e => e.Currency)
                    .HasMaxLength(50)
                    .HasColumnName("currency");

                entity.Property(e => e.CurrencyName)
                    .HasMaxLength(50)
                    .HasColumnName("currency_name");

                entity.Property(e => e.CurrencySymbol)
                    .HasMaxLength(50)
                    .HasColumnName("currency_symbol");

                entity.Property(e => e.Emoji)
                    .HasMaxLength(50)
                    .HasColumnName("emoji");

                entity.Property(e => e.EmojiU)
                    .HasMaxLength(50)
                    .HasColumnName("emojiU");

                entity.Property(e => e.Iso2)
                    .HasMaxLength(50)
                    .HasColumnName("iso2");

                entity.Property(e => e.Iso3)
                    .HasMaxLength(50)
                    .HasColumnName("iso3");

                entity.Property(e => e.Latitude).HasColumnName("latitude");

                entity.Property(e => e.Longitude).HasColumnName("longitude");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.Native)
                    .HasMaxLength(100)
                    .HasColumnName("native");

                entity.Property(e => e.NumericCode).HasColumnName("numeric_code");

                entity.Property(e => e.PhoneCode)
                    .HasMaxLength(50)
                    .HasColumnName("phone_code");

                entity.Property(e => e.Region)
                    .HasMaxLength(50)
                    .HasColumnName("region");

                entity.Property(e => e.Subregion)
                    .HasMaxLength(50)
                    .HasColumnName("subregion");

                entity.Property(e => e.Timezones).HasColumnName("timezones");

                entity.Property(e => e.Tld)
                    .HasMaxLength(50)
                    .HasColumnName("tld");
            });

            modelBuilder.Entity<State>(entity =>
            {
                entity.ToTable("State");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.CountryCode)
                    .HasMaxLength(50)
                    .HasColumnName("country_code");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.CountryName).HasColumnName("country_name");

                entity.Property(e => e.Latitude).HasColumnName("latitude");

                entity.Property(e => e.Longitude).HasColumnName("longitude");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.StateCode)
                    .HasMaxLength(50)
                    .HasColumnName("state_code");

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .HasColumnName("type");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
