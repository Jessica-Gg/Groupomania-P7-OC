class Comment {
    constructor(comment){
        this.user_id = comment.user_id;
        this.date = comment.date;
        this.contenu = comment.contenu;
        this.article_id = comment.article_id;
    }
}

module.export = Comment;