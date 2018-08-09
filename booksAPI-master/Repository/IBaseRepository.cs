using System.Collections.Generic;
using booksAPI.Models;

namespace booksAPI.Repository {
    public interface IBaseRepository<T> where T:Base {
        List<T> Get ();
        void Add(T value);
        void Update(T value);
        void Delete(int id);

        void UpdateJSON(List<T> list);
    }
}