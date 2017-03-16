export default function (path) {
	window.pushState({}, window.title, path);
}