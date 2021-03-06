using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using booksAPI.Models;
using booksAPI.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace booksAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("All")]
    public class BooksController : Controller
    {
        private IBaseRepository<Book> repository;
        public BooksController(IBaseRepository<Book> repository)
        {
            this.repository=repository;
        }

        [HttpGet]
        
        public IEnumerable<Book> Get()
        {
            return this.repository.Get();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Book Get(int id)
        {
            return this.repository.Get().FirstOrDefault(x=>x.Id==id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Book value)
        {
            repository.Add(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Book value)
        {
            repository.Update(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
