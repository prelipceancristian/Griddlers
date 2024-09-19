using Griddlers.Data;
using Griddlers.MappingProfiles;
using Griddlers.Models.Internal;
using Griddlers.Repositories;
using Griddlers.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// read configs from settings json file
builder.Configuration.AddJsonFile("appsettings.json", true, false);

var sqlSettings = builder.Configuration.GetSection("SqlSettings").Get<SqlSettings>() ??
                  throw new NullReferenceException("Cannot read sql settings");
// builder.Services.AddSingleton(sqlSettings);

var fileStorageSettings = builder.Configuration.GetSection("FileStorageSettings").Get<FileStorageSettings>() ??
                          throw new NullReferenceException("Cannot read file storage settings");
builder.Services.AddSingleton(fileStorageSettings);

var apiData = builder.Configuration.GetSection("ApiData").Get<ApiData>() ??
              throw new NullReferenceException("Cannot read api data");
builder.Services.AddSingleton(apiData);

// Ensure local storage folder can work.
if (!Directory.Exists(fileStorageSettings.FileStoragePath))
{
    Directory.CreateDirectory(fileStorageSettings.FileStoragePath);
}


// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options => 
    options.UseSqlite(sqlSettings.ConnectionString));
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IImagesService, ImagesService>();
builder.Services.AddScoped<IFileStorageService, LocalFileStorageService>();
builder.Services.AddAutoMapper(typeof(GriddlersMappingProfile));
builder.Services.AddCors(options =>
    options.AddPolicy("DevCorsPolicy", policyBuilder =>
    {
        policyBuilder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("DevCorsPolicy");
}

app.UseHttpsRedirection();

// add authentication here later
app.UseAuthorization();

app.MapControllers();

app.Run();
