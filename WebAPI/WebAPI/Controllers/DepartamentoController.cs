using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices.JavaScript;
using WebAPI.Data;
using WebAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentoController : ControllerBase
    {
        private Context _context;

        public DepartamentoController(Context context)
        {
            _context = context;

        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = _context.Departamentos.ToList();
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);

            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                Departamento dep = _context.Departamentos.Find(id);
                if(dep == null)
                {
                    return NotFound();

                }
                return Ok(dep);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] DepartamentoModel dep)
        {
            try
            {
                if (String.IsNullOrEmpty(dep.nome))
                {
                    return BadRequest("O nome deve ser informado");

                }
                else if (String.IsNullOrEmpty(dep.sigla))
                {
                    return BadRequest("A singla deve ser informada");

                }

                Departamento Data = new Departamento()
                {
                    nome = dep.nome,
                    sigla = dep.sigla,
                };
                _context.Departamentos.Add(Data);
                _context.SaveChanges();
                return Ok("Departamento criado com sucesso!");

            }
            catch(Exception ex)
            {
                return BadRequest(ex);

            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] DepartamentoModel dep)
        {
            try
            {
                var d = _context.Departamentos.FirstOrDefault(x => x.id == id);
                if(d == null)
                {
                    return NotFound("Departamento não encontrado");

                }
                d.nome = dep.nome;
                d.sigla = dep.sigla;
                _context.SaveChanges();
                return Ok("Dertamento atualizado com sucesso!");

            }
            catch(Exception ex)
            {
                return BadRequest(ex);

            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var dep = _context.Departamentos.Find(id);
                if(dep == null)
                {
                    return NotFound("Departamento não encontrado");

                }
                _context.Departamentos.Remove(dep);
                _context.SaveChanges();
                return Ok("Departamento excluído com sucesso");

            }
            catch(Exception ex)
            {
                return BadRequest(ex);

            }
        }
    }
}
