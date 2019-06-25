var livro = require('../models/Livro');

class LivroDAO {
    constructor() {
        this.nextID = 6;
        this.livros = [
            {
                id: 1,
                titulo: 'O Cortiço',
                isbn: '978-8578886431',
                editora: 'Panda Books',
                autor: 'Aluísio Azevedo',
                descricao: 'Aluísio Azevedo retrata as péssimas condições de vida dos moradores ' +
                    'dos cortiços cariocas neste romance estrelado por dois imigrantes ' +
                    'portugueses. A linguagem rebuscada do autor naturalista do século XIX ' +
                    'é traduzida para os dias de hoje por meio das notas comentadas de Fátima ' +
                    'Mesquita.',
                lancamento: '01/03/2017'
            },
            {
                id: 2,
                titulo: 'Era dos Extremos',
                isbn: '978-8571644687',
                editora: 'Companhia das Letras',
                autor: 'Eric Hobsbawm',
                descricao: 'Eric Hobsbawm, um dos maiores historiadores da atualidade, dá ' +
                    'seu testemunho sobre o século XX: "Meu tempo de vida coincide com ' +
                    'a maior parte da época de que trata este livro", diz ele na abertura, ' +
                    '"por isso até agora me abstive de falar sobre ele". Neste livro ' +
                    'fascinante, porém, ele abandona seu silêncio voluntário para contar, ' +
                    'em linguagem simples e envolvente, a história da "era das ilusões ' +
                    'perdidas"."Um clássico erudito que escreve da mesma maneira agradável ' +
                    'sobre máfia, jazz, rebeldes africanos, política ou economia."William ' +
                    'Waack, Veja"Era dos extremos, de Eric Hobsbawm, é sua obra-prima. Mais ' +
                    'original, mais pessoal e, inevitavelmente, mais político."Perry Anderson, ' +
                    'The Guardian"Hobsbawm vê o século marcado por duas grandes eras, a da ' +
                    'catástrofe (de 1914 a 1948) e a de ouro (de 1949 a 1973). Nele mataram-se ' +
                    'mais seres humanos do que em qualquer outra época e nele se chegou a ' +
                    'níveis de bem-estar e a transformações jamais vistas na experiência humana. ' +
                    'Hobsbawm conta isso com elegante erudição. Tem a mágica de Fred Astaire.' +
                    '"Elio Gaspari, O Estado de S. Paulo',
                lancamento: '04/08/1995'
            },
            {
                id: 3,
                titulo: 'Sejamos todos feministas',
                isbn: '978-8535925470',
                editora: 'Companhia das Letras',
                autor: 'Chimamanda Ngozi Adichie',
                descricao: `O que significa ser feminista no século XXI? Por que o feminismo é essencial para libertar homens e mulheres? Eis as questões que estão no cerne de Sejamos todos feministas, ensaio da premiada autora de Americanah e Meio sol amarelo. "A questão de gênero é importante em qualquer canto do mundo. É importante que comecemos a planejar e sonhar um mundo diferente. Um mundo mais justo. Um mundo de homens mais felizes e mulheres mais felizes, mais autênticos consigo mesmos. E é assim que devemos começar: precisamos criar nossas filhas de uma maneira diferente. Também precisamos criar nossos filhos de uma maneira diferente. "Chimamanda Ngozi Adichie ainda se lembra exatamente da primeira vez em que a chamaram de feminista. Foi durante uma discussão com seu amigo de infância Okoloma. "Não era um elogio. Percebi pelo tom da voz dele; era como se dissesse: 'Você apoia o terrorismo!'". Apesar do tom de desaprovação de Okoloma, Adichie abraçou o termo e — em resposta àqueles que lhe diziam que feministas são infelizes porque nunca se casaram, que são "anti-africanas", que odeiam homens e maquiagem — começou a se intitular uma "feminista feliz e africana que não odeia homens, e que gosta de usar batom e salto alto para si mesma, e não para os homens". Neste ensaio agudo, sagaz e revelador, Adichie parte de sua experiência pessoal de mulher e nigeriana para pensar o que ainda precisa ser feito de modo que as meninas não anulem mais sua personalidade para ser como esperam que sejam, e os meninos se sintam livres para crescer sem ter que se enquadrar nos estereótipos de masculinidade.`,
                lancamento: '18/02/2015'
            },
            {
                id: 4,
                titulo: 'Quarto de Despejo. Diário de Uma Favelada',
                isbn: '978-8508171279',
                editora: 'Ática',
                autor: 'Carolina Maria de Jesus',
                descricao: 'O diário da catadora de papel Carolina Maria de Jesus deu origem à este livro, que relata o cotidiano triste e cruel da vida na favela. A linguagem simples, mas contundente, comove o leitor pelo realismo e pelo olhar sensível na hora de contar o que viu, viveu e sentiu nos anos em que morou na comunidade do Canindé, em São Paulo, com três filhos.',
                lancamento: '01/01/2014'
            },
            {
                id: 5,
                titulo: 'O mundo de Sofia',
                isbn: '978-8535921892',
                editora: 'Seguinte',
                autor: 'Jostein Gaarder',
                descricao: 'Às vésperas de seu aniversário de quinze anos, Sofia Amundsen começa a receber bilhetes e cartões-postais bastante estranhos. Os bilhetes são anônimos e perguntam a Sofia quem é ela e de onde vem o mundo. Os postais são enviados do Líbano, por um major desconhecido, para uma certa Hilde Møller Knag, garota a quem Sofia também não conhece. O mistério dos bilhetes e dos postais é o ponto de partida deste romance fascinante, que vem conquistando milhões de leitores em todos os países e já vendeu mais de 1 milhão de exemplares só no Brasil. De capítulo em capítulo, de “lição” em “lição”, o leitor é convidado a percorrer toda a história da filosofia ocidental, ao mesmo tempo que se vê envolvido por um thriller que toma um rumo surpreendente.',
                lancamento: '19/11/2012'
            }
        ];
    }
    getAll() {
        return this.livros;
    }
    get(id) {
        for (let i = 0; i < this.livros.length; i++) {
            if (this.livros[i].id == id) {
                return this.livros[i];
            }
        }

        return null;
    }
    add(livro) {
        this.livros.push(livro);
    }
    delete(id) {
        var livro = this.get(id);
        var index = this.livros.indexOf(livro);
        this.livros.splice(index, 1);
    }
    update(livro) {
        var oldLivro = this.get(livro.id);
        var index = this.livros.indexOf(oldLivro);
        this.livros.splice(index, 1, livro);
    }
    getNextID(){
        return this.nextID++;
    }
}

module.exports = LivroDAO;