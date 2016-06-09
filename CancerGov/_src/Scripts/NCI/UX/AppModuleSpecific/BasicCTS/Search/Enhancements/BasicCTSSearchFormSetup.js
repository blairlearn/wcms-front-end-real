define(function(require) {
	var $ = require('jquery');
	require('Common/Plugins/Widgets/jquery.ui.autocompleteselector');
	require('BasicCTSSearch/Plugins/jquery.basicctsformtrack')
	var NCI = require('Common/Enhancements/NCI');


	function _showCancerType() {
		$("#fieldset-type").show();
		$("#fieldset-type input").prop("disabled", false);
		$("#fieldset-keyword").hide();
		$("#fieldset-keyword input").prop("disabled", true);
	}

	function _showKeyword() {
		$("#fieldset-keyword").show();
		$("#fieldset-keyword input").prop("disabled", false);
		$("#fieldset-type").hide();
		$("#fieldset-type input").prop("disabled", true);
	}


	/**
	 * Initialize this enhancement; Assume it is called from dom ready.
	 * @return {[type]} Initialize Object
	 */
	function _initialize() {
		//Add click handlers to the toggle
		$('.basiccts-cancertype-toggle').click(function(){_showCancerType(); return false;});
		$('.basiccts-keyword-toggle').click(function(){_showKeyword(); return false;});
		_showCancerType(); //Start by hiding the keyword input.

		$('#ct').autocompleteselector({
			fetchSrc: '/BasicCTS.Service/v1/CancerTypeAutoSuggest',
			queryParam: 'q'
		});

		//Wire Up Web Analytics
		$(".clinical-trials-search-form").basicctsformtrack({
			formName: 'clinicaltrials_basic'
		});

		$(".clinical-trials-search-form").submit(function() {
			//VALIDATE FIELDS!!!
			

			var fieldsAreValid = true;
			
			if (fieldsAreValid) {
				$(this).basicctsformtrack().completed();
			} else {
			// IF NOT VALID, call $(this).basicctsformtrack().errorMessages([
			// 	{
			// 		fieldid,
			// 		errormessage
			// 	}
			// ]);				
				return false;
			}
			

		})
		
	}

	/**
	 * Identifies if this enhancement has been initialized or not.
	 * @type {Boolean}
	 */
	var initialized = false;

	/**
	 * Exposed functions available to this module.
	 */
	return {
		init: function() {
			if (initialized) {
				return;
			}

			_initialize();

			initialized = true;
		}
	};

});