using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using CompliancePortal.JWTConfiguration;
using CompliancePortal.Models;

namespace CompliancePortal.Helpers
{
    public static class AddJWTOptions
    {
        public static void SetOptions(IServiceCollection services, DefaultIdentityOptions _DefaultIdentityOptions, IConfiguration Configuration)
        {
            try
            {
                services.Configure<JwtConfig>(Configuration.GetSection("JwtConfig"));
                var key = Encoding.ASCII.GetBytes(Configuration["JwtConfig:Secret"]);

                var tokenValidationParams = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    RequireExpirationTime = false,
                    ClockSkew = TimeSpan.Zero
                };

                services.AddSingleton(tokenValidationParams);

                services.AddAuthentication(options => {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(jwt => {
                    jwt.SaveToken = true;
                    jwt.TokenValidationParameters = tokenValidationParams;
                });
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
