import {Ribbon, waitSync} from './ribbon';

let run = false;
export default function() {
	if (!run) {
		run = process();
	}
	return run;
}
async function process() {
	await Ribbon.sync({force:true});
	await Ribbon.create({
		description: 'Some ribbon here'
	});
}