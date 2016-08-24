define(function(require){
    var $ = require('jquery');
    require('jquery-ui');
    require('Spinner');

    function _openFeedbackForm($delighterControl) {
        var $dialog = $delighterControl.data("feedbackdialog");

        if (!$dialog) {
            $dialog = _createDialog();
            $delighterControl.data('feedbackdialog', $dialog);
        }

        $dialog.dialog('open');
        
    }

    /**
     * Create the feedback dialog
     * 
     * @returns    
     */
    function _createDialog() {

        var action = '/Feedback.Service'; 

        var $dialogContents = $("<div>");

        //Create form "View"
        var $form = $('<form></form>', {
            name: 'ctsFeedback'
        }).appendTo($dialogContents);
        
        _addHidden($form, '__recipient', value='CTSFeedbackRecipient');
        var $messageInput = _addField($form);
        var $submitBtn = _addSubmit($form);


        //Create Loading Message "View"
        var $loadingMessage = $("<div>", {
            class: "loading-message"
        }).append(
            $("<div>").html("Sending")
        ).hide().appendTo($dialogContents);

        //Create Succeeded Message "View"
        var $succeedMessage = $("<div>", {
            class: "success-message"
        }).append(
            $("<div>").text("Thanks for your feedback!")
        ).hide().appendTo($dialogContents);

        //Create dialog        
        var dialog = $dialogContents.dialog({
            dialogClass: 'cts-feedback-dialog',
            title: 'Send us your feedback',
            autoOpen: false,
            modal: true,
            resizable: false,
            draggable: false,            
            width: '600px',
            position: {
                my: "center",
                at: "center",
                of: window
            } 
        });

        $form.on('submit',function(event) {
            event.preventDefault();
            
            $form.hide();
            $loadingMessage.show().spin();

            //disable close button
            dialog.parent().find(".ui-dialog-titlebar").hide();
            console.log(dialog);
            console.log(dialog.find(".ui-dialog-titlebar"));
            
            _submitFeedback(action, $messageInput.val(), function(err){
                //Remove spinner.
                $loadingMessage.spin(false);
                $loadingMessage.hide();

                if (err) {
                    console.log("There was an error");
                } else {
                    $succeedMessage.show();
                    $dialogContents.dialog({hide: { effect: "fadeOut", duration: 5000 }});
                    $dialogContents.dialog("close");
                    $dialogContents.dialog("destroy");
                }
            });   
            //close dialog 
        });

        //Close at tablet, recenter on resize.
        $(window).resize(function() {
            var curWidth = window.innerWidth || $(window).width();

            if (curWidth < 1024) {
                dialog.dialog("close");
            } else {
                dialog.dialog(
                    "option",
                    "position",
                    {
                        my: "center",
                        at: "center",
                        of: window
                    }
                )
            }
        })

        return dialog;
    }

    /**
     * Submits the form feedback
     * 
     * @param {any} action
     * @param {any} content
     */
    function _submitFeedback(action, content, callback) {        

        //Validate message


        $.ajax({
            type: "POST",
            url: action,
            data: JSON.stringify({
                Message: content,
                URL: window.location.pathname + window.location.search,
                MailRecipientKey: 'CTSFeedbackRecipient'
            }),
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            encode: true
        }).done(function(data) {
            callback(false);
        }).error(function(err) {
            callback(err);
        })
    }

    function _addHidden($form, name, value) {
        $("<input>", {
            id: "hidden1", //Make this unique
            type: "hidden",
            name: name,
            value: value
        })
    }

    function _addField($form) {
        var textInput = $('<textarea>', {
                id: "message",
                name: "message",
                rows: 10
        });

        $('<div>', {
            class: "row"
        }).append(
            $('<label>', {
                for: 'message',
                class: 'inline'
            }).html('Message <br> (please limit your message to 2,000 characters)')
        ).append(
            textInput
        ).appendTo($form);

        return textInput;
    }

    function _addSubmit($form) {
        var submitBtn = $('<button>', {
                type: 'submit',
                class: 'submit button'
            }).text("Submit");

        $('<div>', {
            class: "row"
        }).append(
            submitBtn
        ).appendTo($form);

        return submitBtn;        
    }

    // Initialization for this enhancement.
	function _initialize() {
        $delighterContainer = $(".delighter-rail");
        if ($delighterContainer) {

            var $feedbackDelighter = $("<a></a>", {
                href: "#"
            }).on('click', function(){
                _openFeedbackForm($feedbackDelighter);                
                return false;
            }).prependTo($delighterContainer)
            .append(
                $('<div></div>', {
                    class: "delighter cts-feedback"
                }).html(
                    '<h4>Send us your feedback</h4>' +
                    '<p>Help us make clinical trials searching better</p>'    
                )
            ); 

        }
	}

	/* Flag for telling whether this enhancement has been initialized. */
	var _initialized = false;
	
	/* Exposes functions from this module which are available from the outside. */
	return {
		init: function() {
			if(_initialized)
				return;

			_initialize();

			_initialized = true;
		}		
	};

});

