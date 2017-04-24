

/* ------------ Class para livros ------------ */

function Livro(imagem,titulo,autor,resumo,nomelinks,links,isbn){
	this.imagem = imagem;
	this.titulo = titulo;
	this.autor = autor;
	this.nomelinks = nomelinks;
	this.links = links;
	this.resumo = resumo;
	this.isbn = isbn;
	
	this.likes = 0;
	this.dslikes = 0;

	this.bookshelf;

	this.like = function(){
		return ++this.likes;
	};

	this.render = function(id){
		var idImagem = "#"+id+" .img";
		$(idImagem).attr("src",this.imagem);

		var idTitulo = "#"+id+" .titulo";
		$(idTitulo).html(this.titulo);

		var idAutor = "#"+id+" .autor";
		$(idAutor).html(this.autor);

		var idResumo = "#"+id+" .resumo";
		$(idResumo).html(this.resumo);

		var idLink1 = "#"+id+" .link1";
		$(idLink1).attr("href",links[0]);
		$(idLink1).html(nomelinks[0]);

		var idLink2 = "#"+id+" .link2";
		$(idLink2).attr("href",links[1]);
		$(idLink2).html(nomelinks[1]);

		var idLink3 = "#"+id+" .link3";
		$(idLink3).attr("href",links[2]);
		$(idLink3).html(nomelinks[2]);


		var idLikes = "#"+id+" .likes";
		$(idLikes).html(this.likes);
		
		var idBtgosto = "#"+id+" .btgosto";
		var data = { "book":this,"id":id};
		$(idBtgosto).off('click');
		$(idBtgosto).click(data,function(event){
			event.data.book.like();
			event.data.book.render(event.data.id);
			if (event.data.book.likes>=5){
				var idBtgosto = "#"+id+" .btgosto";
				$(idBtgosto).attr("disabled", true);
			}
		});

		var idBtmuda = "#"+id+" .outrolivro";
		var data = {bookshelf:this.bookshelf,"id":id};
		$(idBtmuda).off('click');
		$(idBtmuda).click(data,function(event){
			event.data.bookshelf.changeBook(event.data.id);
		});

	}
}

// criacao de class "queue" para input de livros

function Queue(){
	this.data = [];

	this.enqueue = function(element){
		this.data.push(element);
	};

	this.dequeue = function(){
		//guarda o 1 valor
		this.position = this.data[0];
		//corta a fatia do array e atualizar o array
		this.data = this.data.slice(1,this.data.length);
		//devolve a fatia
		return this.position;
	}
}

function Estante(){
	this.parteleira = new Queue;
	var bookshelf = this;

	this.addLivro = function(book){
		book.bookshelf = this;
		this.parteleira.enqueue(book); 
	}

	this.init = function(){

		var elemento1 = this.parteleira.dequeue();
		var elemento2 = this.parteleira.dequeue();
		var elemento3 = this.parteleira.dequeue();
		
		elemento1.render("livro1");
		elemento2.render("livro2");
		elemento3.render("livro3");
	}

	this.changeBook = function(id){
	var elemento = this.parteleira.dequeue();
	elemento.render(id);
	}

	this.getFromApi = function(apilivro){
		this.url = "https://www.googleapis.com/books/v1/volumes?q=";
		this.apilivros = {};
		var a = this;

		$.get(this.url+apilivro)
		.done(function(data){
			this.apilivros = data;
			a.parseLivro(this.apilivros)
		})
		.fail(function(){
			console.log('Error: ' + data);
		});
	}

	this.parseLivro = function(data){
		for (var i=0 ; i<(data.items).length ; i++){
 			if (data.items[i].volumeInfo.imageLinks){
 				var newimg = data.items[i].volumeInfo.imageLinks.thumbnail;
 			}else{
 				var newimg = " ";
 			}
 			if (data.items[i].volumeInfo.title){
 				var newtitle =data.items[i].volumeInfo.title;
 			}else{
 				var newtitle = " ";
 			}
 			if (data.items[i].volumeInfo.authors){
 				var newauthor = data.items[i].volumeInfo.authors[0];
 			}else{
 				var newauthor = " ";
 			}
			if (data.items[i].searchInfo){
 				var newresume = data.items[i].searchInfo.textSnippet;
			}else{
	 			var newresume = " ";
 			}
 			if (data.items[i].volumeInfo.industryIdentifiers){
 				var newisbn = data.items[i].volumeInfo.industryIdentifiers[1];
 			}else{
 				var newisbn = data.items[i].volumeInfo.industryIdentifiers[0];
 			}
 		
 			var newLivro = new Livro(newimg,newtitle,newauthor,newresume,["wook","amazon","fnac"],["https://www.wook.pt","https://www.amazon.com","https://www.fnac.pt"],newisbn);
 			bookshelf.addLivro(newLivro);
 			}
 		estante1.init();
	}
}

var estante1 = new Estante();
estante1.getFromApi("Game+Thrones")
//estante1.addLivro(MariaMoises);
//estante1.addLivro(Davinci);
//estante1.addLivro(FormuladeDeus);
//estante1.addLivro(OPrincipezinho);
//estante1.addLivro(OCavaleiro);






