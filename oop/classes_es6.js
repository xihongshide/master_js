class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    getSummary() {
        return this.title + " is written by " + this.author + " in " + this.year;
    }

    getAge() {
        const year = new Date().getFullYear() - this.year;
        return this.title + " is " + year + " years old.";
    }

    reviseYear(newYear) {
        this.year = newYear;
        this.revise = true;
    }

   /*
    Static methods are often used to create utility functions for an application,
    useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.
    */

   static topBooks() {
       return(["topbook1", "topbook2"]);
   }

}

// sub class
class Magazine extends Book {
    constructor(title, author, year, month) {
        super(title, author, year);
        this.month = month;
    }
}


// instances
const book1 = new Book ("book1", "liang1", "1990");
const mag1 = new Magazine("mag1", "liang1", "2018", "Feb");

console.log(mag1);
mag1.reviseYear('2018');
console.log(mag1);

console.log(Magazine.topBooks());
