import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import 'core-js/fn/string/includes';
import { BaseCTSSearchPage } from './BaseCTSSearchPage';
import { CTSSimpleFormSetup } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-simple-form-setup';
import { CTSFieldValidator } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-field-validator';
import * as CTSCommonAnalytics from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics";
import * as FeedbackForm from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/FeedbackForm";
import "../../../../Plugins/jquery.nci.equal_heights";

/**
 * Defined the class for loading the enhancements of the page
 * 
 * @class SimpleCTSSearchPage
 * @extends {BaseCTSSearchPage}
 */
class SimpleCTSSearchPage extends BaseCTSSearchPage {
	constructor() {
		super();
	}

	/**
	 * Wire up the on Ready functions.
	 * 
	 * @memberof SimpleCTSSearchPage
	 */
	onReady():void {
		new CTSSimpleFormSetup(this.Config.ClinicalTrialsAPIServer).init();
		new CTSFieldValidator().init();
		(<any>(CTSCommonAnalytics)).init();
		(<any>(FeedbackForm)).init();
		(<any>jQuery('[data-match-height]')).NCI_equal_heights();
	}
}

(function() { //encapsulation
	let searchPage:SimpleCTSSearchPage = new SimpleCTSSearchPage();
	$(searchPage.onReady.bind(searchPage))
})();