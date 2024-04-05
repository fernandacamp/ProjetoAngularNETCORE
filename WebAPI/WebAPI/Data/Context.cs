using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using WebAPI.Controllers;
using WebAPI.Map;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class Context : DbContext
    {
        internal object id;

        public Context(DbContextOptions<Context> options) : base(options) { }
        public DbSet<Departamento> Departamentos { get; set; }
        public DbSet<Funcionario> Funcionarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Password=95649570;Persist Security Info=True;User ID=sa;Initial Catalog=ProjetoDatabase;Data Source=DESKTOP-B77M8CJ\\MSQL;TrustServerCertificate=True");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new DepartamentoMap());
            modelBuilder.ApplyConfiguration(new FuncionarioMap());
        }
    }
}
