
export default class AdrStyleSheetList {
	private readonly styleSheets: { title: string | null; disabled: boolean }[] = [];
	get length() {
		return this.styleSheets.length;
	}
	item(index: number) {
		return this.styleSheets[index];
	}
	static fromDom(domStyleSheetList: StyleSheetList) {
		const styleSheetList = new AdrStyleSheetList();
		for (let i = 0; i < domStyleSheetList.length; i++) {
			const domStyleSheet = domStyleSheetList[i];
			styleSheetList.styleSheets.push({
				title: domStyleSheet.title,
				disabled: false
			});
		}
		return styleSheetList;
	}

}
