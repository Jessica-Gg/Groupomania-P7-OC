const Article = function(article){
    this.user_id = article.user_id;
    this.date = article.date;
    this.titre = article.titre;
    this.imageUrl = article.imageUrl;
    this.description = article.description; 
}

module.export = Article;