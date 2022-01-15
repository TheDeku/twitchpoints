
import { CronJob } from 'cron'
import { client } from './configuration';

let socialNetwork = new CronJob(
	'0/30 * * * * ',
	async function () {
		try {
			client.say('relaxingcode',`Redes sociales: https://linktr.ee/relaxingcode`)
			client.say('relaxingcode',`Discord: https://discord.gg/gcFkGmre`)
			
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