export default function(target, name, descriptor) {
	let bound = Symbol();
	let value = descriptor.value;
	descriptor.get = function() {
		if (!this[bound]) {
			this[bound] = value.bind(this);
		}
		return this[bound];
	};
	delete descriptor.value;
	delete descriptor.writable;
	return descriptor;
}