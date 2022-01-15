import axios from "axios";

export async function channelRedemptions() {
    try {
        let body = {
            "type": "channel.channel_points_custom_reward_redemption.add",
            "version": "1",
            "condition": {
                "broadcaster_user_id": "52995959"
            },
            "transport": {
                "method": "webhook",
                "callback": process.env.URL_WEBHOOK_SUSCRIBER,
                "secret": "somethingS3cret"
            }
        }
        let twitchClient = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`, {})
        
        let response = await axios.post("https://api.twitch.tv/helix/eventsub/subscriptions",body,{
            headers: { 'content-Type': 'application/json',"Authorization": `Bearer ${twitchClient.data.access_token}`,"CLIENT-ID":process.env.TWITCH_CLIENT_ID }
        })
        return response;
    } catch (error) {
        console.log(error.data);
        return error;
    }

}