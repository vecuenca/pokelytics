<?php

use Illuminate\Database\Seeder;

class LocationsTableSeeder extends Seeder
{
	/**
	* Run the database seeds.
	*
	* @return void
	*/
	public function run()
	{
			$loc_array = [
				['67', 'Celadon City', 'Kanto'],
				['68', 'Cerulean City', 'Kanto'],
				['71', 'Cinnabar Island', 'Kanto'],
				['73', 'Digletts Cave', 'Kanto'],
				['76', 'Fuchsia City', 'Kanto'],
				['80', 'Mt. Moon', 'Kanto'],
				['86', 'Pallet Town', 'Kanto'],
				['87', 'Rock Tunnel', 'Kanto'],
				['88', 'Route 1', 'Kanto'],
				['89', 'Route 10', 'Kanto'],
				['90', 'Route 11', 'Kanto'],
				['91', 'Route 12', 'Kanto'],
				['92', 'Route 13', 'Kanto'],
				['93', 'Route 14', 'Kanto'],
				['94', 'Route 15', 'Kanto'],
				['95', 'Route 16', 'Kanto'],
				['96', 'Route 17', 'Kanto'],
				['97', 'Route 18', 'Kanto'],
				['98', 'Sea Route 19', 'Kanto'],
				['99', 'Route 2', 'Kanto'],
				['100', 'Sea Route 20', 'Kanto'],
				['101', 'Sea Route 21', 'Kanto'],
				['102', 'Route 22', 'Kanto'],
				['103', 'Route 24', 'Kanto'],
				['104', 'Route 25', 'Kanto'],
				['105', 'Route 26', 'Kanto'],
				['106', 'Route 27', 'Kanto'],
				['107', 'Route 28', 'Kanto'],
				['109', 'Route 3', 'Kanto'],
				['120', 'Route 4', 'Kanto'],
				['130', 'Route 5', 'Kanto'],
				['131', 'Route 6', 'Kanto'],
				['132', 'Route 7', 'Kanto'],
				['133', 'Route 8', 'Kanto'],
				['134', 'Route 9', 'Kanto'],
				['136', 'Seafoam Islands', 'Kanto'],
				['147', 'Cerulean Cave', 'Kanto'],
				['151', 'Vermilion City', 'Kanto'],
				['152', 'Victory Road', 'Kanto'],
				['154', 'Viridian City', 'Kanto'],
				['155', 'Viridian Forest', 'Kanto'],
				['157', 'Route 23', 'Kanto'],
				['158', 'Power Plant', 'Kanto'],
				['159', 'Victory Road', 'Kanto'],
				['160', 'Pokémon Tower', 'Kanto'],
				['161', 'Pokémon Mansion', 'Kanto'],
				['162', 'Safari Zone', 'Kanto'],
				['231', 'Pewter City', 'Kanto'],
				['232', 'Lavender Town', 'Kanto'],
				['233', 'Indigo Plateau', 'Kanto'],
				['234', 'Saffron City', 'Kanto'],
				['491', 'Monean Chamber', 'Kanto'],
				['492', 'Liptoo Chamber', 'Kanto'],
				['493', 'Weepth Chamber', 'Kanto'],
				['494', 'Dilford Chamber', 'Kanto'],
				['495', 'Scufib Chamber', 'Kanto'],
				['496', 'Rixy Chamber', 'Kanto'],
				['497', 'Viapos Chamber', 'Kanto'],
				['498', 'S.S. Anne', 'Kanto'],
				['499', 'Victory Road', 'Kanto'],
				['500', 'Mt. Ember', 'Kanto'],
				['501', 'Berry Forest', 'Kanto'],
				['502', 'Icefall Cave', 'Kanto'],
				['503', 'Pattern Bush', 'Kanto'],
				['504', 'Lost Cave', 'Kanto'],
				['505', 'Kindle Road', 'Kanto'],
				['506', 'Treasure Beach', 'Kanto'],
				['507', 'Cape Brink', 'Kanto'],
				['508', 'Bond Bridge', 'Kanto'],
				['509', 'Three Isle Port', 'Kanto'],
				['510', 'Resort Gorgeous', 'Kanto'],
				['511', 'Water Labyrinth', 'Kanto'],
				['512', 'Five Isle Meadow', 'Kanto'],
				['513', 'Memorial Pillar', 'Kanto'],
				['514', 'Outcast Island', 'Kanto'],
				['515', 'Green Path', 'Kanto'],
				['516', 'Water Path', 'Kanto'],
				['517', 'Ruin Valley', 'Kanto'],
				['518', 'Trainer Tower', 'Kanto'],
				['519', 'Canyon Entrance', 'Kanto'],
				['520', 'Sevault Canyon', 'Kanto'],
				['521', 'Tanoby Ruins', 'Kanto'],
				['522', 'Route 19', 'Kanto'],
				['523', 'Route 20', 'Kanto'],
				['524', 'Route 21', 'Kanto'],
				['526', 'One Island', 'Kanto'],
				['527', 'Four Island', 'Kanto'],
				['528', 'Five Island', 'Kanto'],
				['529', 'Altering Cave', 'Kanto'],
				['530', 'Victory Road', 'Kanto']
			];

			foreach ($loc_array as list($a,$b,$c))
      {
            DB::insert(
            'insert into locations
            (id, name, region)
            values
            (?, ?, ?) ',
             [$a,$b,$c]);
      }
	}
}