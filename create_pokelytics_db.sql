CREATE TABLE `pokemons` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type_1` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type_2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hp` double(4,1) NOT NULL,
  `attack` double(4,1) NOT NULL,
  `defense` double(4,1) NOT NULL,
  `special` double(4,1) NOT NULL,
  `speed` double(4,1) NOT NULL,
  `catch_rate` double(4,1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `pokemon_moves` (
  `pokemon` int(10) unsigned NOT NULL,
  `move` int(10) unsigned NOT NULL,
  `learned_at` int(11) NOT NULL,
  PRIMARY KEY (`pokemon`,`move`,`learned_at`),
  KEY `pokemon_moves_move_foreign` (`move`),
  CONSTRAINT `pokemon_moves_move_foreign` FOREIGN KEY (`move`) REFERENCES `moves` (`id`),
  CONSTRAINT `pokemon_moves_pokemon_foreign` FOREIGN KEY (`pokemon`) REFERENCES `pokemons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `pokemon_locations` (
  `pokemon` int(10) unsigned NOT NULL,
  `location` int(10) unsigned NOT NULL,
  KEY `pokemon_locations_pokemon_foreign` (`pokemon`),
  KEY `pokemon_locations_location_foreign` (`location`),
  CONSTRAINT `pokemon_locations_location_foreign` FOREIGN KEY (`location`) REFERENCES `locations` (`id`),
  CONSTRAINT `pokemon_locations_pokemon_foreign` FOREIGN KEY (`pokemon`) REFERENCES `pokemons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `moves` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `power` int(11) DEFAULT NULL,
  `accuracy` int(11) DEFAULT NULL,
  `pp` int(11) NOT NULL,
  `effect` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `locations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `region` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `music_played` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

