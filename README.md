*** HOW TO RUN ***

composer install

cp .env.example .env

php artisan jwt:secret

php artisan key:generate

php artisan storage:link

php artisan migrate --seed

php artisan serve 