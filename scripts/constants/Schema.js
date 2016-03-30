export const dialogData = [
	[
		"Table Name: pokemons",
		"Columns: \r\n \
 		id	        	int(10) UN AI PK \r\n \
 		name		varchar(255) \r\n \
 		type_1		varchar(255) \r\n \
 		type_2		varchar(255) \r\n \
 		hp	        	double(4,1) \r\n \
 		attack		double(4,1) \r\n \
 		defense		double(4,1) \r\n \
 		special		double(4,1) \r\n \
 		speed		double(4,1) \r\n \
 		catch_rate	double(4,1)"
	],

	[
		"Table Name: trainers",

		"Columns: \r\n \
		id	         	         int(10) UN AI PK \r\n \
		name		         varchar(255) \r\n \
		physical_location	 varchar(255)"
	],

	[
		"Table Name: moves",
		"Columns: \r\n \
 		id			int(10) UN AI PK \r\n \
 		name		varchar(255) \r\n \
 		type			varchar(255) \r\n \
 		category		varchar(255) \r\n \
 		power		int(11) \r\n \
 		accuracy	int(11) \r\n \
 		pp			int(11) \r\n \
 		effect		varchar(255)"
	],

	[
		"Table Name: locations",
		"Columns: \r\n \
 		id				int(10) UN AI PK \r\n \
 		name			varchar(255) \r\n \
 		region			varchar(255) \r\n \
 		music_played	varchar(255)"
	],

	[
		"Table Name: pokemon_moves",
	
		"Columns: \r\n\
 		pokemon	int(10) UN PK \r\n\
 		move		int(10) UN PK \r\n\
 		learned_at	int(11) PK \r\n"
	],

	[
		"Table Name: pokemon_locations",
		"Columns: \r\n \
 		pokemon	int(10) UN \r\n \
 		location		int(10) UN \r\n"
	],

	[
		"Table Name: trainers",
		"Columns: \r\n \
 		pokemon	int(10) UN PK \r\n \
 		trainer		int(10) UN PK \r\n \
 		name		varchar(255) PK \r\n \
 		move1		int(10) UN \r\n \
 		move2		int(10) UN \r\n \
 		move3		int(10) UN \r\n \
 		move4		int(10) UN"
	]
]