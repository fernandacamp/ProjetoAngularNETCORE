namespace WebAPI.Models
{
    public class Funcionario
    {
        public Funcionario() { }

        public Funcionario(int id,string nome,string foto,string rg,int departamentoId)
        {
            this.id = id;
            this.nome = nome;
            this.foto = foto;
            this.rg = rg;
            this.departamentoId = departamentoId;
        }
        public int id { get; set; }
        public string nome { get; set; }
        public string foto { get; set; }
        public string rg { get; set; }
        public virtual int departamentoId { get; set; }
        public virtual Departamento Departamento { get; set; }
       
    }
}
