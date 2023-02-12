import mockAxios from "../__mocks__/axios";
import MattermostHook from "../mattermostHook";

describe ("Standard options", () => {
    const fakeOpts = {
        name: 'totally-fake-MattermostHook',
        formatter: 'totally-fake-formatter',
        webhookUrl: 'https://totally.fake.url',
        channel: '#totally-fake-channel',
        username: 'totally-fake-username',
        iconEmoji: ':totally-fake-emoji:',
        iconUrl: 'https://totally.fake.icon.url',
    };

    let fakeMattermostHook;

    beforeAll(() => {
        jest.clearAllMocks();
        fakeMattermostHook = new MattermostHook(fakeOpts);
    });

    beforeEach(() => {
        jest.resetModules();
    })

    it("checks if parameters are correct", () => {
        expect(fakeMattermostHook).toBeInstanceOf(MattermostHook);
        expect(fakeMattermostHook.name).toEqual(fakeOpts.name);
        expect(fakeMattermostHook.formatter).toEqual(fakeOpts.formatter);
        expect(fakeMattermostHook.webhookUrl).toEqual(fakeOpts.webhookUrl);
        expect(fakeMattermostHook.channel).toEqual(fakeOpts.channel);
        expect(fakeMattermostHook.username).toEqual(fakeOpts.username);
        expect(fakeMattermostHook.iconEmoji).toEqual(fakeOpts.iconEmoji);
        expect(fakeMattermostHook.iconUrl).toEqual(fakeOpts.iconUrl);
        expect(mockAxios.create).toHaveBeenCalledTimes(1);
    });

    it("log function gets called with correct params", () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            channel: fakeOpts.channel,
            username: fakeOpts.username,
            icon_emoji: fakeOpts.iconEmoji,
            icon_url: fakeOpts.iconUrl,
            text: 'undefined: undefined'
        };

        fakeMattermostHook.log({}, fakeCb);

        expect(fakeMattermostHook.axiosInstance.post).toHaveBeenCalledTimes(1);
        expect(fakeMattermostHook.axiosInstance.post).toHaveBeenCalledWith(
            fakeOpts.webhookUrl,
            fakePayload
        );
    })
})

describe ("Standard options with custom formatter", () => {
    const fakeFormatter = jest.fn((info) => ({ text: `Custom message: ${info.message}` }));
    const fakeOpts = {
        name: 'totally-fake-mattermostHook',
        formatter: fakeFormatter,
        webhookUrl: 'https://totally.fake.url',
        channel: '#totally-fake-channel',
        username: 'totally-fake-username',
        iconEmoji: ':totally-fake-emoji:',
        iconUrl: 'https://totally.fake.icon.url',
    };

    let fakeMattermostHook;

    beforeAll(() => {
        jest.clearAllMocks();
        fakeMattermostHook = new MattermostHook(fakeOpts);
    });

    beforeEach(() => {
        jest.resetModules();
    })

    it("checks if parameters are correct", () => {
        expect(fakeMattermostHook).toBeInstanceOf(MattermostHook);
        expect(fakeMattermostHook.name).toEqual(fakeOpts.name);
        expect(fakeMattermostHook.formatter).toEqual(fakeOpts.formatter);
        expect(fakeMattermostHook.webhookUrl).toEqual(fakeOpts.webhookUrl);
        expect(fakeMattermostHook.channel).toEqual(fakeOpts.channel);
        expect(fakeMattermostHook.username).toEqual(fakeOpts.username);
        expect(fakeMattermostHook.iconEmoji).toEqual(fakeOpts.iconEmoji);
        expect(fakeMattermostHook.iconUrl).toEqual(fakeOpts.iconUrl);
        expect(mockAxios.create).toHaveBeenCalledTimes(1);
    });

    it("log function gets called with correct params", () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            attachments: undefined,
            channel: fakeOpts.channel,
            username: fakeOpts.username,
            icon_emoji: fakeOpts.iconEmoji,
            icon_url: fakeOpts.iconUrl,
            text: 'Custom message: undefined'
        };

        fakeMattermostHook.log({}, fakeCb);

        expect(fakeMattermostHook.axiosInstance.post).toHaveBeenCalledTimes(1);
        expect(fakeMattermostHook.axiosInstance.post).toHaveBeenCalledWith(
            fakeOpts.webhookUrl,
            fakePayload
        );

        expect(fakeFormatter).toHaveBeenCalledTimes(1);
    })
})

describe ("Custom options with custom formatter", () => {
    const fakeFormatter = jest.fn((info) => ({ text: `Custom message: ${info.message}`, icon_url: "a", username: "b", icon_emoji: "c", channel:"d"  }));
    const fakeOpts = {
        name: 'totally-fake-MattermostHook',
        formatter: fakeFormatter,
        webhookUrl: 'https://totally.fake.url',
        channel: '#totally-fake-channel',
        username: 'totally-fake-username',
        iconEmoji: ':totally-fake-emoji:',
        iconUrl: 'https://totally.fake.icon.url',
    };

    let fakeMattermostHook;

    beforeAll(() => {
        jest.clearAllMocks();
        fakeMattermostHook = new MattermostHook(fakeOpts);
    });

    beforeEach(() => {
        jest.resetModules();
    })
    
    it("log function gets called with correct params", () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            attachments: undefined,
            mrkdwn: fakeOpts.mrkdwn,
            text: 'Custom message: undefined',
            icon_url: "a", 
            username: "b", 
            icon_emoji: "c", 
            channel:"d"  
        };

        fakeMattermostHook.log({}, fakeCb);

        expect(fakeMattermostHook.axiosInstance.post).toHaveBeenCalledTimes(1);
        expect(fakeMattermostHook.axiosInstance.post).toHaveBeenCalledWith(
            fakeOpts.webhookUrl,
            fakePayload
        );

        expect(fakeFormatter).toHaveBeenCalledTimes(1);
    })
})

describe ("Standard options with formatter that filters out all messages", () => {
    const fakeFormatter = jest.fn((info) => false);
    const fakeOpts = {
        name: 'totally-fake-MattermostHook',
        formatter: fakeFormatter,
        webhookUrl: 'https://totally.fake.url',
        channel: '#totally-fake-channel',
        username: 'totally-fake-username',
        iconEmoji: ':totally-fake-emoji:',
        iconUrl: 'https://totally.fake.icon.url'
    };

    let fakeMattermostHook;

    beforeAll(() => {
        jest.clearAllMocks();
        fakeMattermostHook = new MattermostHook(fakeOpts);
    });

    beforeEach(() => {
        jest.resetModules();
    })

    it("checks if parameters are correct", () => {
        expect(fakeMattermostHook).toBeInstanceOf(MattermostHook);
        expect(fakeMattermostHook.name).toEqual(fakeOpts.name);
        expect(fakeMattermostHook.formatter).toEqual(fakeOpts.formatter);
        expect(fakeMattermostHook.webhookUrl).toEqual(fakeOpts.webhookUrl);
        expect(fakeMattermostHook.channel).toEqual(fakeOpts.channel);
        expect(fakeMattermostHook.username).toEqual(fakeOpts.username);
        expect(fakeMattermostHook.iconEmoji).toEqual(fakeOpts.iconEmoji);
        expect(fakeMattermostHook.iconUrl).toEqual(fakeOpts.iconUrl);
        expect(mockAxios.create).toHaveBeenCalledTimes(1);
    });

    it("log function gets called with correct params", () => {
        const fakeCb = jest.fn();
        const fakePayload = {
            channel: fakeOpts.channel,
            username: fakeOpts.username,
            icon_emoji: fakeOpts.iconEmoji,
            icon_url: fakeOpts.iconUrl,
            mrkdwn: fakeOpts.mrkdwn,
            text: 'undefined: undefined'
        };

        fakeMattermostHook.log({}, fakeCb);

        expect(fakeMattermostHook.axiosInstance.post).toHaveBeenCalledTimes(0);

        expect(fakeFormatter).toHaveBeenCalledTimes(1);
    })
})