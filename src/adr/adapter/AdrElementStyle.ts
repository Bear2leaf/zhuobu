
export default class AdrElementStyle {
	properties: Record<string, string> = {};
	getPropertyValue(key: string) {
		return this.properties[key];
	}
	setProperty(key: string, value: string) {
		this.properties[key] = value;
	}
}
