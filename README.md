pravo  (в контейнерах [docker](https://www.docker.com/)
==============

Проекты обращаются к одной базе данных, которая должна быть стартована на локальном компьютере до их запуска.

<br>

----------------------------------------------------

#### Требуемое ПО
На компьютере разработчика должно быть установлены:
* [Git](https://git-scm.com/downloads)
* [Docker](https://docs.docker.com/engine/installation/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [db-docker](https://git.rg.ru/ivlev/db-docker) - База данных MySQL для всех приложений outer.

    Установка и запуск db-docker

    ```sh
    git clone git@git.rg.ru:ivlev/db-docker.git
    cd db-docker
    docker-compose up  -d
    ```

--------------------------------------------------

## Порядок работы 

1. Из папки `pravo/` запустите сервисы docker

    ```sh
    docker-compose up -d
    ```
    Просмотр логов:
    ```sh
    docker-compose logs -f
    ```


    **Очистка кэша Symfony:**
    ```
    docker-compose exec pravo /var/www/pravo/www/bin/console cache:clear --no-warmup --env=prod
    ```

    Для контроля запуска откройте браузер :

    * [http://localhost:3034](http://localhost:3034/)
 


2. Измените и оттестируйте код.
3. Внесите изменения в репозиторий git.rg.ru:

---------------------

<pre style="color:red">
<b>
ВНИМАНИЕ, ХАК!!!!!
</b>

На момент докеризации неправильно срабатывали команды: 
npm install, gulp.
Эти команды не должны запускаться до исправления кода.

<!-- Как временное решение в репозиторий добавлены:

1) папки, скопированые с сервера pravo.rg.ru.

www/src/JuristBundle/Resources/public
www/src/JuristBundle/Resources/views

После исправления кода нужно удалить их из репозитория. -->

1) файл node_modules.zip, как архивная копия серверной директории node_modules . 
Его можно распаковать (unzip node_modules.zip) перед запуском Gulp, чтобы  иметь точно такие же файлы
как на сервере.

</pre>

<br>
<br>

**Команды**

Временная остановка сервисов 

```
docker-compose stop
```

Пуск остановленных сервисов

```
docker-compose start
```

Останов и удаление сервисов

```
docker-compose down
```

Стартованные сервисы выдерживают перезагрузку компьютера.




<br>
<br>


**Oтладка PHP**



1. Узнайте локальный IP своего компьютера :

    ```sh
    sudo ifconfig | grep 'inet '
    ```

2. В файле  `etc/php/php.ini`. Установите параметр
 `remote_host` в значение своего IP :

    ```sh
    ...
    xdebug.remote_host=192.168.0.1 # your IP
    ...
    ```
3. Перезапустите сервисы
   ```sh
   docker-compose restart
   ```

Документация об  [удаленной отладке Xdebug](https://xdebug.org/docs/remote). 
[Интеграция PHPStorm с docker](https://github.com/nanoninja/docker-nginx-php-mysql/blob/master/doc/phpstorm-macosx.md).



TODO:

"Pravo:Api:SidebarAction" redis key creates very slowly.
