# https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG PHP_VERSION=7.4

FROM php:${PHP_VERSION}-fpm-alpine

ARG XDEBUG_VERSION=2.9.8
RUN set -eux; \
	\
	apk add --no-cache --virtual .build-deps \
	    $PHPIZE_DEPS \
		coreutils \
		freetype-dev \
		libjpeg-turbo-dev \
		libpng-dev \
		libzip-dev \
		git\
	; \
	\
	docker-php-ext-configure gd --with-freetype --with-jpeg \
	; \
	\
	docker-php-ext-install -j "$(nproc)" \
		gd \
		opcache \
		pdo_mysql \
		zip \
	; \
	pecl install \
        xdebug-${XDEBUG_VERSION} \
        apcu \
    ; \
    pecl clear-cache; \
    docker-php-ext-enable \
        xdebug \
        apcu \
    ; \
	\
	runDeps="$( \
		scanelf --needed --nobanner --format '%n#p' --recursive /usr/local \
			| tr ',' '\n' \
			| sort -u \
			| awk 'system("[ -e /usr/local/lib/" $1 " ]") == 0 { next } { print "so:" $1 }' \
	)"; \
        apk add --virtual .drupal-phpexts-rundeps $runDeps; \
	apk del .build-deps

RUN apk add --no-cache mariadb-client patch git

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER=1

#Install drush launcher
ADD https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar drush.phar
RUN chmod +x drush.phar \
    && mv drush.phar /usr/local/bin/drush

# Change PHP-FPM user
RUN addgroup -g 1000 -S web \
    && adduser -u 1000 -S web -G www-data \
    && sed -i s/'user = www-data'/'user = web'/g /usr/local/etc/php-fpm.d/www.conf \
    && sed -i s/'group = www-data'/'group = web'/g /usr/local/etc/php-fpm.d/www.conf

CMD ["php-fpm"]
