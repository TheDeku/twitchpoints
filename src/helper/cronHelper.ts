
import { CronJob } from 'cron'
import { client } from './configuration';

let socialNetwork = new CronJob(
	'0/15 * * * * ',
	async function () {
		try {
			client.say('relaxingcode',`Redes sociales: https://linktr.ee/relaxingcode`)
			client.say('relaxingcode',`Discord: https://discord.gg/MExp3hyEk5`)
			
		} catch (error) {
			console.log(error);
		}	
	},
	null,
	false,
	'America/Santiago'
)

const CronHelper = {
    socialNetwork
}
export default CronHelper