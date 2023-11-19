# API Home Telegram Bot
API para mandar notificaciones por Telegram, a partir de peticiones lanzadas por cambios de estado en la domótica de casa.

## Información básica
### Servidor
El servidor está montado sobre un contenedor Ubuntu con las siguientes características:

Versión Ubuntu
```
18.04.6
```
Versión node
```
14.21.3
```
Versión npm
```
6.14.18
```
Para mantener siempre activo el servidor se usa [supervisorctl](http://supervisord.org/running.html).

### Instalación
Pasos para instalar y ejecutar la API.
1. Clonar el repo en el servidor `git clone XXX`.
2. Instalar paquetes y dependencias `npm i`.
3. Crear el archivo ***src/configs/config-bot.json*** a partir del archivo *config-bot-example.json*, con el token y el chatId del bot de Telegram. Esto se explica en detalle en el siguiente apartado.
4. Crear el archivo ***src/configs/notifications.json*** a partir del archivo *notifications-example.json* con el texto de las notificaciones que se quieran enviar. Esto también se explica en el siguiente apartado.
5. Arrancar la API `npm run start`.

## Configuración
### Telegram Bot (*config-bot.json*)
Antes de modificar este archivo se tiene que crear un [bot de Telegram](https://core.telegram.org/bots/tutorial). Una vez creado se tiene que especificar lo siguiente:
- El **token** del bot de Telegram, proporcionado por @BotFather al crear el bot.
- El **chatId** del chat/canal al cual queremos enviar las notificaciones. Se puede obtener mediante el endpoint [getUpdates](https://stackoverflow.com/questions/31078710/how-to-obtain-telegram-chat-id-for-a-specific-user).

### Notificaciones (*notifications.json*)
Este archivo contiene el texto de todas las notificaciones. La estructura es la siguiente:
```json
[{
  "id": "exampleId",
  "actions": {
    "on": "ON text notification",
    "off": "OFF text notification"
  }
}]
```
El **id** es único y puede contener todas las **actions** que se necesiten. Cada acción tiene que ser diferente a las demás.

## Endpoints
| Endpoint | Método | Body | Descripción |
|-----|---|---|---|
| /sendNotification | POST | `{"id": "exampleId", "action": "on"}` | Envia la notificación |

En caso de no encontrar la notificación en el JSON con el **id** y la **action**, el servidor devuelve ***status: 400*** con un mensaje de error.

