using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using booksAPI.Models;
using booksAPI.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace booksAPI {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        private const string booksUrl = @"C:\Users\Patrycja\Desktop\api\booksAPI-master\Database\books.json";
        private const string authorsUrl = @"C:\Users\Patrycja\Desktop\api\booksAPI-master\Database\authors.json";

        public IConfiguration Configuration { get; }

        public void ConfigureServices (IServiceCollection services) {
            services.AddMvc ();
            services.AddCors (o => o.AddPolicy ("All", builder => {
                builder.AllowAnyOrigin ()
                    .AllowAnyMethod ()
                    .AllowAnyHeader ();
            }));

            services.AddTransient<IBaseRepository<Book>> ((provider) => {
                return new BaseRepository<Book> (booksUrl);
            });

            services.AddTransient<IBaseRepository<Author>> ((provider) => {
                return new BaseRepository<Author> (authorsUrl);
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            app.UseMvc ();

        }
    }
}