using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using CompliancePortal.ConHelper;
using CompliancePortal.Data;
using CompliancePortal.Helpers;
using CompliancePortal.Models;
using CompliancePortal.Models.CommonViewModel;
using CompliancePortal.Services;
using CompliancePortal.Repository.Interface;
using CompliancePortal.Services.Branch.Interface;
using CompliancePortal.Repository;
using CompliancePortal.Services.Member;
using CompliancePortal.Repository.AsyncInterface;

namespace CompliancePortal
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddRazorPages().AddRazorRuntimeCompilation();
            services.AddControllersWithViews().AddRazorRuntimeCompilation();

            services.AddScoped<ApplicationDbContext>();

            string _GetConnStringMSSQL = Configuration.GetConnectionString("DefaultConnectionMSSQL");
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(_GetConnStringMSSQL));

            //string _GetConnStringMySQL = Configuration.GetConnectionString("DefaultConnectionMySQL");
            //services.AddDbContextPool<ApplicationDbContext>(options => options.UseMySql(_GetConnStringMySQL, ServerVersion.AutoDetect(_GetConnStringMySQL)));

            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(60);
            });

            DefaultIdentityOptions _DefaultIdentityOptions = null;

            var _IServiceScopeFactory = services.BuildServiceProvider().GetRequiredService<IServiceScopeFactory>();
            var _CreateScope = _IServiceScopeFactory.CreateScope();
            var _ServiceProvider = _CreateScope.ServiceProvider;
            var _context = _ServiceProvider.GetRequiredService<ApplicationDbContext>();
            bool IsDBCanConnect = _context.Database.CanConnect();

            if (IsDBCanConnect && _context.DefaultIdentityOptions.Count() > 0)
                _DefaultIdentityOptions = _context.DefaultIdentityOptions.Where(x => x.Id == 1).SingleOrDefault();
            else
            {
                IConfigurationSection _IConfigurationSection = Configuration.GetSection("IdentityDefaultOptions");
                services.Configure<DefaultIdentityOptions>(_IConfigurationSection);
                _DefaultIdentityOptions = _IConfigurationSection.Get<DefaultIdentityOptions>();
            }

            AddJWTOptions.SetOptions(services, _DefaultIdentityOptions, Configuration);
            AddIdentityOptions.SetOptions(services, _DefaultIdentityOptions);


            // Get Super Admin Default options
            services.Configure<SuperAdminDefaultOptions>(Configuration.GetSection("SuperAdminDefaultOptions"));
            services.Configure<ApplicationInfo>(Configuration.GetSection("ApplicationInfo"));

            services.AddTransient<ICommon, Common>();
            services.AddTransient<IAccount, Account>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IRoles, Roles>();
            services.AddTransient<IFunctional, Functional>();
            services.AddScoped(typeof(IRepository<>), typeof(BanchRepository<>));
            services.AddScoped(typeof(IasyncRepository<>), typeof(MemberRepository<>));
            services.AddScoped<IBranchService, BranchService>();
            services.AddScoped<IMemberService, MemberService>();
            services.AddTransient<IUserService, UserService>();

            services.AddScoped<ApplicationUserRepository>();

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
            });

            services.AddHttpClient("ScreeningAPI", options =>
            {
                options.BaseAddress = new Uri(Configuration["ScreeningAPIEndpoint:Url"]);
            });

            services.AddHttpClient("HomeAffiarsVerificationAPI", options =>
            {
                options.BaseAddress = new Uri(Configuration["HomeAffiarsAPIEndpoint:Url"]);
            });

            services.AddHttpClient("AccountAddressVerificationAPI", options =>
            {
                options.BaseAddress = new Uri(Configuration["AccountAddressVerificationEndpoint:Url"]);
            });

            services.AddHttpClient("PriceCheckAPI", options =>
            {
                options.BaseAddress = new Uri(Configuration["PriceCheckEndpoint:Url"]);
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Screening", Version = "v1" });
                c.AddSecurityDefinition("BearerAuth", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    Scheme = JwtBearerDefaults.AuthenticationScheme.ToLowerInvariant(),
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    BearerFormat = "JWT",
                    Description = "JWT Authorization header using the Bearer scheme."
                });

                c.OperationFilter<AuthResponsesOperationFilter>();
            });
            services.AddCors(options =>
            {
                options.AddPolicy("Open", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CompliancePortal v1"));
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseSession();

            app.UseRouting();
            app.UseAuthorization();

            app.UseCors("Open");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Dashboard}/{action=Index}/{id?}");
            });

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapControllers();
            //});
        }
    }


    internal class AuthResponsesOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var attributes = context.MethodInfo.DeclaringType.GetCustomAttributes(true)
                                .Union(context.MethodInfo.GetCustomAttributes(true));

            if (attributes.OfType<IAllowAnonymous>().Any())
            {
                return;
            }

            var authAttributes = attributes.OfType<IAuthorizeData>();

            if (authAttributes.Any())
            {
                operation.Responses["401"] = new OpenApiResponse { Description = "Unauthorized" };

                if (authAttributes.Any(att => !String.IsNullOrWhiteSpace(att.Roles) || !String.IsNullOrWhiteSpace(att.Policy)))
                {
                    operation.Responses["403"] = new OpenApiResponse { Description = "Forbidden" };
                }

                operation.Security = new List<OpenApiSecurityRequirement>
                {
                    new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Id = "BearerAuth",
                                    Type = ReferenceType.SecurityScheme
                                }
                            },
                            Array.Empty<string>()
                        }
                    }
                };
            }
        }
    }
}
