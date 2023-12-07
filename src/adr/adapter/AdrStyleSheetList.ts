
export default class AdrStyleSheetList {
	private readonly styleSheets: { title: string | null; }[] = [];
	static fromDom(domStyleSheetList: StyleSheetList) {
		const styleSheetList = new AdrStyleSheetList();
		for (let i = 0; i < domStyleSheetList.length; i++) {
			const domStyleSheet = domStyleSheetList[i];
			styleSheetList.styleSheets.push({
				title: domStyleSheet.title
			});
		}
		return styleSheetList;
	}

}
