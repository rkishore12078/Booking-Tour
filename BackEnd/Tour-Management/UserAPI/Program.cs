using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using UserAPI.Interfaces;
using UserAPI.Models;
using UserAPI.Services;
using UserAPI.Utilities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("ReactCors", policy =>
    {
        policy.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
    });
});

builder.Services.AddDbContext<UserContext>
                (options => options.UseSqlServer(builder.Configuration.GetConnectionString("myConn")));

builder.Services.AddScoped<IRepo<User,int>,UserRepo>();
builder.Services.AddScoped<IRepo<TravelAgent, int>, TravelAgentRepo>();
builder.Services.AddScoped<IRepo<Traveller, int>, TravellerRepo>();
builder.Services.AddScoped<IUserService,UserService>();
builder.Services.AddScoped<ITravelAgentService,TravelAgentService>();
builder.Services.AddScoped<ITravellerService,TravellerService>();
builder.Services.AddScoped<ITokenService,TokenService>();
builder.Services.AddScoped<IPasswordService,PasswordService>();
builder.Services.AddScoped<IAdapter,Adapter>();
builder.Services.AddScoped<IResetPasswordService,ResetPasswordService>();
builder.Services.AddScoped<IEmailBody,EmailBodyService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
                       ValidateIssuer = false,
                       ValidateAudience = false
                   };
               });

builder.Services.AddSwaggerGen(c => {
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                 {
                     {
                           new OpenApiSecurityScheme
                             {
                                 Reference = new OpenApiReference
                                 {
                                     Type = ReferenceType.SecurityScheme,
                                     Id = "Bearer"
                                 }
                             },
                             new string[] {}

                     }
                 });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ReactCors");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
