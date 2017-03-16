export default function (path, context) {
	if (!context) {
		throw new Error('context must be set before redirecting.  Use Router redirect component for easy redirect');
	}
	context.redirect = path;
}