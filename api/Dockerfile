# # Use the official PHP 8.2 image as a base
# FROM php:8.2-fpm

# # Set working directory
# WORKDIR /var/www/html

# # Install dependencies
# RUN apt-get update && apt-get install -y \
#     libpng-dev \
#     libjpeg-dev \
#     libfreetype6-dev \
#     libzip-dev \
#     zip \
#     unzip \
#     && docker-php-ext-configure gd --with-freetype --with-jpeg \
#     && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql zip

# # Install Composer
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# # Copy existing application directory contents
# COPY . .

# # Install Composer dependencies
# RUN composer install --no-interaction --optimize-autoloader

# # Copy .env.example to .env
# RUN cp .env.example .env

# # Generate application key
# RUN php artisan key:generate

# # Generate JWT secret
# RUN php artisan jwt:secret

# # Create a symbolic link from storage to public directory
# RUN php artisan storage:link

# # Set permissions and ownership
# RUN chmod -R 775 storage/ \
#     && chown -R www-data:www-data storage/ \
#     && chmod -R 777 database/

# # Run database migrations and seed
# RUN php artisan migrate

# # Expose port 9000 and start php-fpm server
# EXPOSE 9000
# CMD ["php-fpm"]


FROM lorisleiva/laravel-docker:8.2
RUN apk add grpc
EXPOSE 8000

WORKDIR /var/www

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY .  /var/www

RUN rm -f composer.lock
RUN composer install
# RUN php artisan cache:clear
# RUN php artisan config:clear
RUN cp .env.example .env
RUN php artisan key:generate
RUN php artisan jwt:secret
RUN chmod -R 775 storage/
RUN chown -R www-data:www-data storage/
RUN chmod -R 777 database/
RUN php artisan migrate
RUN php artisan migrate:fresh --seed
RUN php artisan storage:link

CMD php artisan --host=0.0.0.0 serve

