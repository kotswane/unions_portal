using Microsoft.AspNetCore.Http;
using SendGrid;
using System;
using System.IO;
using System.Threading.Tasks;

namespace CompliancePortal.Helpers
{
    public static class DocumentsHelper
    {

        public static async Task<(string base64file, string mimetype, string extension)> SaveFile(IFormFile file, string fileName,string folder)
        {
            if (file == null) return ("no_file","","");

           
            var path = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/upload/{folder}", fileName + Path.GetExtension(file.FileName));
            
            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            var mimetype = file.ContentType;
            var extension = Path.GetExtension(file.FileName);
            using (FileStream reader = new FileStream(path, FileMode.Open))
            {
                byte[] buffer = new byte[reader.Length];
                reader.Read(buffer, 0, (int)reader.Length);
                string base64file = Convert.ToBase64String(buffer);
                
                return (base64file, mimetype, extension);
            }
        }
    }
}
