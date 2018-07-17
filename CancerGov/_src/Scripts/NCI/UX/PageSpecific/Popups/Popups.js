define(function(require) {
    var CONFIG = require('Modules/NCI.config');
	var $script = require('scriptjs');

	// Loading Noto Sans font for popups
    WebFontConfig = {
        google: {
            families: ['Noto Sans', 'Noto Sans:bold']
        }
    };

    (function(d) {
        var wf = d.createElement('script'), s = d.scripts[0];
        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
        wf.async = true;
        s.parentNode.insertBefore(wf, s);
    })(document);


	$script([CONFIG.CDN.jquery, CONFIG.CDN.jplayer], function(){
        	require('Common/Enhancements/popup_functions');

        	if (jQuery.jPlayer) {

                var my_jPlayer = $("#dictionary_jPlayer");

                my_jPlayer.jPlayer({
                    swfPath: "/PublishedContent/files/global/flash/", //Path to SWF File Used by jPlayer
                    //errorAlerts: true,
                    supplied: "mp3" //The types of files which will be used.
                });

                //Attach a click event to the audio link
                $("a.CDR_audiofile").click(function(e) {
                	e.preventDefault();
                    my_jPlayer.jPlayer("setMedia", {
                        mp3: $(this).attr("href") // Defines the m4v url
                    }).jPlayer("play");
                });
            }
	});

});
