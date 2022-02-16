import tmi from 'tmi.js';
import CronHelper from './cronHelper';

export let client:tmi.Client;
export async function initializeBot(user:any) {
    let opts = {
        identity: {
            username: `oauth:{${user.acessToken}}`,
            password: process.env.OAUTH_TOKEN,
        },
        channels: ['relaxingcode'],
    }
    client = new tmi.client(opts);

    await client.connect()

    //CronHelper.socialNetwork.start()
    // return client;
}

