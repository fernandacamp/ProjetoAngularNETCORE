using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.Arm;
using WebAPI.Data;
using WebAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncionarioController : ControllerBase
    {
        private Context _context;

        public FuncionarioController(Context context)
        {
            _context = context;

        }

        [HttpGet("{departamentoId}")]
        public IActionResult Get(int departamentoId)
        {
            try
            {
                var result = _context.Funcionarios.Where(f=>f.departamentoId == departamentoId).ToList();
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);

            }
        }

        //[HttpGet("{id}")]
        //public IActionResult GetbyId(int id)
        //{
        //    try
        //    {
        //        Funcionario fun = _context.Funcionarios.Find(id);
        //        if (fun == null)
        //        {
        //            return NotFound();

        //        }
        //        return Ok(fun);

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}

        [HttpPost("{departamentoId}")]
        public IActionResult Post(int departamentoId, [FromBody] FuncionarioModel fun)
        {
            try
            {
                if (String.IsNullOrEmpty(fun.nome))
                {
                    return BadRequest("O nome deve ser informado");

                }
                else if (String.IsNullOrEmpty(fun.rg))
                {
                    return BadRequest("O RG deve ser informado");

                }
                else if (String.IsNullOrEmpty(fun.foto))
                {
                    return BadRequest("A foto deve ser informada");

                }

                Funcionario Data = new Funcionario()
                {
                    nome = fun.nome,
                    rg = fun.rg,
                    foto = fun.foto,
                    departamentoId = departamentoId,
                };
                _context.Funcionarios.Add(Data);
                _context.SaveChanges();
                return Ok("Funcionário cadastrado com sucesso!");

            }
            catch (Exception ex)
            {
                return BadRequest(ex);

            }

        }

        [HttpPut("{id}")]
        public IActionResult Put(int departamentoId,int id, [FromBody] FuncionarioModel fun)
        {
            try
            {
                var f = _context.Funcionarios.FirstOrDefault(x => x.id == id);
                if (f == null)
                {
                    return NotFound("Funcionário não encontrado");

                }
                f.nome = fun.nome;
                f.rg = fun.rg;
                f.departamentoId = departamentoId;
                _context.SaveChanges();
                return Ok("Funcionário atualizado com sucesso!");

            }
            catch (Exception ex)
            {
                return BadRequest(ex);

            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var fun = _context.Funcionarios.Find(id);
                if (fun == null)
                {
                    return NotFound("Funcionário não encontrado");

                }
                _context.Funcionarios.Remove(fun);
                _context.SaveChanges();
                return Ok("Funcionário excluído com sucesso");

            }
            catch (Exception ex)
            {
                return BadRequest(ex);

            }
        }
    }
}
