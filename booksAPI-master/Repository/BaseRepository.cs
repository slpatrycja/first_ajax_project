using System.Collections.Generic;
using booksAPI.Models;
using Newtonsoft.Json;
using System.Linq;

namespace booksAPI.Repository{
    public class BaseRepository<T> : IBaseRepository<T> where T:Base
    {
        readonly string url;
        public  BaseRepository(string url)
        {
            this.url=url;
        }

        public void Add(T value)
        {
            var currentState=Get();
            value.Id=currentState.Count>0 ?  currentState.Max(x=>x.Id)+1:1;
            currentState.Add(value);
            UpdateJSON(currentState);
        }

        public void Delete(int id)
        {
            var currentState=Get();
            currentState.Remove(currentState.FirstOrDefault(x=>x.Id==id));
            UpdateJSON(currentState);
        }

        public List<T> Get()
        {
            var JSON = System.IO.File.ReadAllText (url);
            return JSON.Length<1? new List<T>() : JsonConvert.DeserializeObject<List<T>>(JSON); 
        }

        public void Update(T value)
        {
            var currentState=Get();
            var toUpdate=currentState.FindIndex(x=>x.Id==value.Id);
            currentState[toUpdate]=value;
            UpdateJSON(currentState);
        }

        public void UpdateJSON(List<T> list)
        {
             System.IO.File.WriteAllText(url, JsonConvert.SerializeObject(list));
        }
    }
}