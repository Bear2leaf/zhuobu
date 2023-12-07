
export default class AdrClassList {
	private readonly classList: string[] = [];
	add(className: string) {
		this.classList.push(className);
	}
	remove(className: string) {
		const index = this.classList.indexOf(className);
		if (index !== -1) {
			this.classList.splice(index, 1);
		}
	}
	contains(className: string) {
		return this.classList.indexOf(className) !== -1;
	}
}
