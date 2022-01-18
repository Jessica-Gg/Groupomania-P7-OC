const Article = function(article){
    this.user_id = article.user_id;
    this.date = article.date;
    this.imageUrl = article.imageUrl;
    this.contenu = article.contenu; 
}

module.export = Article;