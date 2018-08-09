using System;

namespace booksAPI.Models {
    public class Book:Base {
        public string Title { get; set; }
        public int AuthorId { get; set; }

    }
}