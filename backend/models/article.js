class Article{
    constructor(article){
        this.id = article.id;
        this.user_id = article.user_id;
        this.date = article.date;
        this.image = article.image;
        this.contenu = article.contenu; 
    }
}

module.export = Article;