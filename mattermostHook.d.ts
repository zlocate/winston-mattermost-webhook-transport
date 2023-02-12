import Transport = require("winston-transport");

declare class MattermostHook extends Transport {
    constructor (opts: MattermostHook.MattermostHookOptions);
}

declare namespace MattermostHook {
    interface TransformableInfo {
        level: string;
        message: string;
        [key: string]: any;
    }

    interface MattermostMessage {
        text?: string
        attachments?: any[]
        icon_emoji?: string
        username?: string
        icon_url?: string
        channel?: string
    }

    interface MattermostHookOptions {
        /**
         * Mattermost incoming webhook URL. 
         * 
         * {@link https://developers.mattermost.com/integrate/webhooks/incoming/using-incoming-webhooks/ Follow steps 1 through 3 at this link to create a new webhook if you don't already have one}.
         */
        webhookUrl: string;
        name?: string;
        /**
         * Custom function to format messages with. This function accepts the `info` object ({@link https://github.com/winstonjs/winston/blob/master/README.md#streams-objectmode-and-info-objects see Winston documentation}) and must return an object with at least one of the following three keys: `text` (string), `attachments` (array of {@link https://api.slack.com/messaging/composing/layouts#attachments attachment objects}), `blocks` (array of {@link https://api.slack.com/messaging/composing/layouts#adding-blocks layout block objects}). These will be used to structure the format of the logged Slack message. By default, messages will use the format of `[level]: [message]` with no attachments or layout blocks. Return `false` to prevent this plugin from posting to Slack.
         */
        formatter?: (info: TransformableInfo) => MattermostMessage | false;
        /**
         * Level to log. Global settings will apply if left undefined.
         */
        level?: string;
        /**
         * Allows specifying a proxy server that {@link https://github.com/axios/axios#request-config gets passed directly down to Axios} (Default: `undefined`)
         */
        proxy?: any;
        /**
         * Overrides the webhook's default channel. This should be a channel ID. (Default: `undefined`)
         */
        channel?: string;
         /**
         * Overrides the webhook's default username. (Default: `undefined`)
         */
        username?: string;
        /**
         * An {@link https://www.webpagefx.com/tools/emoji-cheat-sheet/ emoji code string} to use in place of the default icon. Interchangeable with `iconUrl`. (Default: `undefined`)
         */
        iconEmoji?: string;
         /**
         * An icon image URL string to use in place of the default icon. Interchangeable with `iconEmoji`. (Default: `undefined`)
         */
        iconUrl?: string;
    }
}

export = MattermostHook;
