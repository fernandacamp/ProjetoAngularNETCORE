using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Map
{
    public class DepartamentoMap : IEntityTypeConfiguration<Departamento>
    {
        public void Configure(EntityTypeBuilder<Departamento> builder)
        {
            builder.ToTable("departamento");
            builder.HasKey(x => x.id);
            builder.Property(x => x.id)
               .IsRequired()
               .ValueGeneratedOnAdd();
            builder.Property(x => x.nome);
            builder.Property(x => x.sigla);

            builder.HasMany(x => x.Funcionarios)
                .WithOne(x => x.Departamento)
                .HasForeignKey(x => x.departamentoId);

        }

    }
}
