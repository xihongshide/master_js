// Factory function
function createBook(title, author, year) {
    return {
        title,
        author,
        year,
        getSummary: () => this.title + "is written by " + this.author + "in" + this.year,
    }
}


const book0 = createBook("book0", "liang0", "1970");
console.log(book0);


// Constructor
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;


    // this.getSummary = function() {
    //     return this.title + "is written by " + this.author + "in" + this.year;
    // }
}

// Store the method in the prototype
Book.prototype.getSummary = function() {
    return this.title + " is written by " + this.author + " in " + this.year;
}

Book.prototype.getAge = function() {
    const year = new Date().getFullYear() - this.year;
    return this.title + " is " + year + " years old.";
}

Book.prototype.reviseYear = function(newYear) {
    this.year = newYear;
    this.revise = true;
}

// Magazine constructor
function Magazine(title, author, year, month) {
    Book.call(this, title, author, year);
    this.month = month;
}

// inherit Prototype
Magazine.prototype = Object.create(Book.prototype);

// use Magzine constructor
Magazine.prototype.constructor = Magazine;

// Init instance
const book1 = new Book ("book1", "liang1", "1990");
const mag1 = new Magazine("mag1", "liang1", "2018", "Feb");

console.log(mag1.getSummary());
