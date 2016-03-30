# Instructions
1. mkdir ~/Code/  
2. cd ~/Code/  
3. git clone https://github.com/vincent-cuenca/pokelytics  
Read instructions from https://laravel.com/docs/5.2/homestead, this will setup all the dependencies to startup a local web server that contains a mysql instance etc

for your .homestead/Homestead.yaml folders use:

    folders:
        - map: ~/Code
          to: /home/vagrant/Code

    sites:
        - map: homestead.app
          to: /home/vagrant/Code/pokelytics/public

4. After setting up homestead, vagrant up your box, and vagrant ssh into it, navigate to the pokelytics directory.
5. type: composer install
6. php artisan migrate
7. php artisan db:seed
8. npm install

Navigate to homestead.app to view the app.
