include .env

#silent by default
ifndef VERBOSE
.SILENT:
endif

start:
	$(call do_start)

setup:
	$(call do_setup)

restart:
	$(call do_restart)

update:
	$(call do_update)

cc:
	docker exec -it ${APP_NAME}_php sh -c 'drush cr'

cex:
	docker exec -it ${APP_NAME}_php sh -c 'drush cex -y'

cim:
	docker exec -it ${APP_NAME}_php sh -c 'drush cim -y'

stop:
	$(call do_stop)

destroy:
	$(call do_destroy)

recreate:
	$(call do_recreate)

import-db:
	docker exec -i ${APP_NAME}_database bash -c 'exec mysql -uroot -plamp lamp' < $(FILE)

ssh:
	docker exec -it ${APP_NAME}_php sh

help:
	$(call do_display_commands)

info:
	$(call do_display_app_info)

define do_db_healthcheck
	docker exec -it ${APP_NAME}_php sh -c 'chmod +x /app/.docker/php/database-healthcheck.sh'
	docker exec -it ${APP_NAME}_php sh -c '/app/.docker/php/database-healthcheck.sh'
endef

define do_start
	docker-compose up -d --build
	docker exec -it ${APP_NAME}_php sh -c 'composer install --prefer-dist --no-progress --no-suggest --optimize-autoloader'
	$(call do_db_healthcheck)
	docker exec -it ${APP_NAME}_php sh -c  'drush config:import -y'
	docker exec -it ${APP_NAME}_php sh -c  'drush config-split:import dev -y'
	docker exec -it ${APP_NAME}_php sh -c  'drush cr'
	echo -e '\n'
	echo -e '\e[42m${APP_NAME} started\e[0m'
	$(call do_display_commands)
	$(call do_display_app_info)
endef

define do_setup
	docker-compose up -d --build
	docker exec -it ${APP_NAME}_php sh -c 'cp /app/api/web/sites/default/docker-dev.settings.local.php /app/api/web/sites/default/settings.local.php'
	docker exec -it ${APP_NAME}_php sh -c 'composer install --prefer-dist --no-progress --no-suggest --optimize-autoloader'
	$(call do_db_healthcheck)
	docker exec -it ${APP_NAME}_php sh -c  'drush site-install minimal --account-name=${DRUPAL_ADMIN_USER} --account-pass=${DRUPAL_ADMIN_PASSWORD} --existing-config -y'
	docker exec -it ${APP_NAME}_php sh -c  'chmod 775 -R web/sites/default/files'
	docker exec -it ${APP_NAME}_php sh -c  'chown web:web -R .'
	docker exec -it ${APP_NAME}_php sh -c  'drush cr'
	echo -e '\n'
	echo -e '\e[42m${APP_NAME} setup completed\e[0m'
	$(call do_display_commands)
	$(call do_display_app_info)
endef

define do_restart
	docker-compose down
	docker-compose up -d --build
	docker exec -it ${APP_NAME}_php sh -c 'composer install --no-progress'
	$(call do_db_healthcheck)
	docker exec -it ${APP_NAME}_php sh -c  'drush config:import -y'
	docker exec -it ${APP_NAME}_php sh -c  'drush config-split:import dev -y'
	docker exec -it ${APP_NAME}_php sh -c  'drush cr'
	echo -e '\n'
	echo -e '\e[42m${APP_NAME} restarted\e[0m'
	$(call do_display_commands)
	$(call do_display_app_info)
endef

define do_update
	docker exec -it ${APP_NAME}_php sh -c 'composer install --prefer-dist --no-progress --no-suggest --optimize-autoloader'
	docker exec -it ${APP_NAME}_php sh -c 'drush updb -y'
	docker exec -it ${APP_NAME}_php sh -c 'drush config:import -y'
	docker exec -it ${APP_NAME}_php sh -c 'drush config-split:import dev -y'
	docker exec -it ${APP_NAME}_php sh -c 'drush cr'
	echo -e '\n'
	echo -e '\e[42m${APP_NAME} updated\e[0m'
endef

define do_stop
	docker-compose down
	echo -e '\n'
	echo -e '\e[42m${APP_NAME} stopped\e[0m'
endef

define do_destroy
	docker-compose down --volumes
	echo -e '\n'
	echo -e '\e[42m${APP_NAME} stopped and data deleted\e[0m'
endef

define do_recreate
	$(call do_destroy)
	$(call do_setup)
	echo -e '\n'
	echo -e '\e[42m${APP_NAME} re-created\e[0m'
endef

define do_display_app_info
	echo -e '\n'
	echo -e '\e[1m--- ${APP_NAME} APP INFO ---\e[0m'
	echo -e '\n'
	echo -e 'API URL: \e[94mhttps://localhost:${APP_PORT}/user/login\e[0m\nAdmin user credentials: ${DRUPAL_ADMIN_USER} - ${DRUPAL_ADMIN_PASSWORD}\nDatabase port: ${DATABASE_PORT}'
endef

define do_display_commands
	echo -e 'Setup the local development environment for ${APP_NAME}: \e[32mmake \e[0m\e[1msetup\e[0m'
	echo -e 'Stop the running app: \e[32mmake \e[0m\e[1mstop\e[0m'
	echo -e 'Stop the running app and delete the data: \e[32mmake \e[0m\e[1mdestroy\e[0m'
	echo -e 'Destroy the local environment and set it up again: \e[32mmake \e[0m\e[1mrecreate\e[0m'
	echo -e 'Start an app that has already been setup: \e[32mmake \e[0m\e[1mstart\e[0m'
	echo -e 'Restart an app that has already been setup: \e[32mmake \e[0m\e[1mrestart\e[0m'
	echo -e 'Update the Drupal installation: \e[32mmake \e[0m\e[1mupdate\e[0m'
	echo -e 'Clear the app caches: \e[32mmake \e[0m\e[1mcc\e[0m'
	echo -e 'Export the Drupal configs: \e[32mmake \e[0m\e[1mcex\e[0m'
	echo -e 'SSH to the app terminal: \e[32mmake \e[0m\e[1mssh\e[0m'
	echo -e 'Import a database: \e[32mmake \e[0m\e[1mimport-db FILE=./path/to/mysql.sql\e[0m'
endef
