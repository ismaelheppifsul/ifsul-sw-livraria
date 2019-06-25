class Livro {
    constructor(id, titulo, isbn, editora, autor, descricao, lancamento) {
        this.id = id;
        this.titulo = titulo;
        this.isbn = isbn;
        this.editora = editora;
        this.autor = autor;
        this.descricao = descricao;
        this.lancamento = lancamento;
    }
}

module.exports = Livro;