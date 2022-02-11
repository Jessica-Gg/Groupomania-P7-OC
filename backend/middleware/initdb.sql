

-- groupomania.`user` definition
DROP TABLE IF EXISTS `commentaire`;
DROP TABLE IF EXISTS `article`;
DROP TABLE IF EXISTS `user`;


CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `admin` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) CHARSET=UTF8MB4;

-- groupomania.article definition


CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL,
  `image` varchar(2050) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `contenu` varchar(10000) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES user(id)
) CHARSET=UTF8MB4;



-- groupomania.commentaire definition

CREATE TABLE `commentaire` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL,
  `contenu` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES user(id),
  FOREIGN KEY (`article_id`) REFERENCES article(id)
) CHARSET=UTF8MB4;