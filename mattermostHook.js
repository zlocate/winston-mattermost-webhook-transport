'use strict';

const Transport = require('winston-transport');
const axios = require('axios').default;

module.exports = class MattermostHook extends Transport {
  constructor (opts) {
    super(opts);

    opts = opts || {};

    this.name = opts.name || 'slackWebhook';
		this.level = opts.level || undefined;
    this.webhookUrl = opts.webhookUrl;
    this.formatter = opts.formatter || undefined;
    this.unfurlLinks = opts.unfurlLinks || false;
    this.unfurlMedia = opts.unfurlMedia || false;
   
    this.channel = opts.channel || '';
    this.username = opts.username || '';
    this.iconEmoji = opts.iconEmoji || '';
    this.iconUrl = opts.iconUrl || '';

    this.axiosInstance = axios.create({
      proxy: opts.proxy || undefined
    });
  }

  log (info, callback) {
		let payload = {
      channel: this.channel,
      username: this.username,
      icon_emoji: this.iconEmoji,
      icon_url: this.iconUrl
    }

    if (this.formatter && typeof this.formatter === 'function') {
      let layout = this.formatter(info);

      if (!layout) return;

      // Note: Supplying `text` when `blocks` is also supplied will cause `text` 
      // to be used as a fallback for clients/surfaces that don't suopport blocks   
      Object.keys(layout).forEach(key => {
        payload[key] = layout[key];
      });
    } else {
      payload.text = `${info.level}: ${info.message}`
    }

    this.axiosInstance.post(this.webhookUrl, payload)
    .then(response => {
      this.emit('logged', info);
      callback();
    })
    .catch(err => {
      this.emit('error', err);
      callback();
    });
  }
}
