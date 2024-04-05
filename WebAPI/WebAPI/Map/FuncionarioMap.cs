using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Models;

namespace WebAPI.Map
{
    public class FuncionarioMap : IEntityTypeConfiguration<Funcionario>
    {
        public void Configure(EntityTypeBuilder<Funcionario> builder)
        {
            builder.ToTable("Funcionarios");
            builder.HasKey(x => x.id);
            builder.Property(x => x.id)
                .IsRequired()
                .ValueGeneratedOnAdd();
            builder.Property(x => x.nome);
            builder.Property(x => x.foto);
            builder.Property(x => x.rg);
            builder.Property(x => x.departamentoId);

            builder.HasOne(x => x.Departamento)
                .WithMany(x => x.Funcionarios)
                .HasForeignKey(x => x.departamentoId);
        }
    }
}
