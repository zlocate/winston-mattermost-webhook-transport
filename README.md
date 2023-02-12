# winston-mattermost-webhook-transport

A Mattermost transport for Winston 3+ that logs to a channel via webhooks.
This project is fork of https://github.com/TheAppleFreak/winston-slack-webhook-transport with minor changes


![Continuous Integration](https://github.com/zlocate/winston-mattermost-webhook-transport/actions/workflows/tests.yml/badge.svg) [![npm version](https://badge.fury.io/js/winston-mattermost-webhook-transport.svg)](https://www.npmjs.com/package/winston-mattermost-webhook-transport) [![downloads](https://img.shields.io/npm/dw/winston-mattermost-webhook-transport)]((https://www.npmjs.com/package/winston-mattermost-webhook-transport))

## Installation

```
npm install winston winston-mattermost-webhook-transport
```

## Usage

### Set up with transports

```javascript
const winston = require("winston");
const MattermostHook = require("winston-mattermost-webhook-transport");

const logger = winston.createLogger({
    level: "info",
    transports: [
        new MattermostHook({
            webhookUrl: "https://your-mattermost-server.com/hooks/xxx-generatedkey-xxx"
        })
    ]
});

logger.info("This should now appear on Mattermost");
```

### Set up by adding

```javascript
const winston = require("winston");
const MattermostHook = require("winston-mattermost-webhook-transport");

const logger = winston.createLogger({});

logger.add(new MattermostHook({ webhookUrl: "https://your-mattermost-server.com/hooks/xxx-generatedkey-xxx" }));
```

### Options

* `webhookUrl` **REQUIRED** - Slack incoming webhook URL. [Follow steps 1 through 3 at this link to create a new webhook if you don't already have one](https://developers.mattermost.com/integrate/webhooks/incoming/).
* `formatter` - Custom function to format messages with. This function accepts the `info` object ([see Winston documentation](https://github.com/winstonjs/winston/blob/master/README.md#streams-objectmode-and-info-objects)) and must return an object with at least one of the following three keys: `text` (string), `attachments` (array of [attachment objects](https://developers.mattermost.com/integrate/reference/message-attachments/)).
* `level` - Level to log. Global settings will apply if left undefined.
* `proxy` - Allows specifying a proxy server that [gets passed directly down to Axios](https://github.com/axios/axios#request-config) (Default: `undefined`)
* `channel` - Overrides the webhook's default channel. This should be a channel ID. (Default: `undefined`)
* `username` - Overrides the webhook's default username. (Default: `undefined`)
* `iconEmoji` - An [emoji code string](https://www.webpagefx.com/tools/emoji-cheat-sheet/) to use in place of the default icon. (Interchangeable with `iconUrl`) (Default: `undefined`)
* `iconUrl` - An icon image URL string to use in place of the default icon. Interchangeable with `iconEmoji`. (Default: `undefined`)
