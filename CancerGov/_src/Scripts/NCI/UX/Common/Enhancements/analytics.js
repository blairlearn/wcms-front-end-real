define(function(require) {
	var $ = require('jquery');

	(function() {

		//utility functions
		// treeText
		// when clicking on an accordion button, get the accordion hierarchy and depth
		// ARGS
		// obj:jQuery collection - collection of accordion titles
		function treeText(obj){
			var str = "",depth = 0;
			$(obj.get().reverse()).each(function(i,el){
				if(str == "") {
					str = $(el).find("a:first").text();
				} else {
					str += ">" + $(el).find("a:first").text();
				}
				depth++;
			});
			return {string:str,depth:depth};
		}

		$('#mega-nav a')
			.filter(function() { return $(this).closest('.mobile-item').length === 0; })
			.on('click.analytics', function(event) {
				var $this = $(this),
					tree = [],
					treeParents = $this.parent('li').parents('li')
				;
				tree.push($this[0]);
				if (treeParents.children('a').length > 0) {
					tree.push(treeParents.children('a')[0]);
				}
				if (treeParents.children('div').children('a').length > 0) {
					tree.push(treeParents.children('div').children('a')[0]);
				}

				NCIAnalytics.MegaMenuClick(this, tree);
			});

		var menuRevealed;
		var megaNav = $("#mega-nav");
		var mobileMenuBar = $(".mobile-menu-bar");
		megaNav.on('mouseenter.analytics','.nav-item',function(e) {
			window.clearTimeout(menuRevealed);
			if (mobileMenuBar.is(":hidden")) {
				menuRevealed = window.setTimeout(function () {
					var menuText = $('#mega-nav a.open').text();
					NCIAnalytics.MegaMenuDesktopReveal(this, menuText);
				}, 1000);
			}
		}).on('mouseleave.analytics','.nav-item',function(e){
			window.clearTimeout(menuRevealed);
		}).on('click.analytics','button.toggle',function(){
			var $this = $(this),
				isExpanded = $this.attr('aria-expanded')==='true',
				tree = treeText($this.parents("li")).string,
				linkText = $this.prev().text() //linkText no longer used now that it's being captured with the tree values
			;
			NCIAnalytics.MegaMenuMobileAccordionClick(this, isExpanded, tree);

		}).on('click.analytics','.lvl-1 a, .mobile-item a',function(e){
			if(mobileMenuBar.is(":visible")){
				//e.preventDefault();
				var $this = $(this),
					url = 'www.cancer.gov' + location.pathname.toLowerCase(),
					linkText = $this.text(),
					linkUrl = $this.attr('href'),
					root = $this.closest(".lvl-1"),
					heading = $.trim(root.children(":first").find('a').text()),
					parent = $this.closest(".lvl-2"),
					subHeading = parent[0] && parent.children(":first").find('a').get(0) !== this?$.trim(parent.children(":first").find('a').text()):heading
				;

				//console.log("url: " + url + "\nlinkText: " + linkText  + "\nlinkUrl: " + linkUrl + "\nheading: " + heading + "\nsubHeading: " + subHeading);
				NCIAnalytics.MegaMenuMobileLinkClick(this, url, linkText, linkUrl, heading, subHeading);
			}
		});

		mobileMenuBar.on('click.analytics','.nav-header',function(){
			var isVisible = false;
			if($('#mega-nav > .nav-menu').attr('aria-hidden') === 'false'){
				isVisible = true;
			}
			if(isVisible){
				NCIAnalytics.MegaMenuMobileReveal(this);
			}
		});

		$('.utility a').each(function(i, el) {
			$(el).on('click.analytics', function(event) {
				var $this = $(this);
				var linkText = $this.text();

				NCIAnalytics.UtilityBarClick(this, linkText);
			});
		});

		$('.nci-logo')
			.on('click.analytics', function(event) {
				NCIAnalytics.LogoClick(this)
			});

		$('.feature-primary .feature-card').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.children('h3').text();
				var linkText = $this.children('h3').text();
				var container = 'Feature';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.feature-secondary .feature-card').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.children('h3').text();
				var linkText = $this.children('h3').text();
				var container = 'SecondaryFeature';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.guide-card .card').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $(el).children('h2').text();
				var linkText = $this.text();
				var container = 'Guide';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.multimedia .card').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.children('h3').text();
				var linkText = $this.children('h3').text();
				var container = 'Multimedia';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.card-thumbnail .card-thumbnail-image').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.closest('a').attr('data-title');
				var linkText = 'Image';
				var container = 'Thumbnail';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.card-thumbnail .card-thumbnail-text').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.closest('h3').find('a:first').text();
				var linkText = $this.closest('h3').find('a:first').text();
				var container = 'Thumbnail';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$('.cthp-card-container .cthpCard').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				var cardTitle = $this.closest('.cthpCard').find('h3:first').text();
				var linkText = $this.text();
				var container = 'CTHP';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		// Track clicks on on Topic Page Featured Card
		$('.topic-feature .feature-card').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {
				var $this = $(this);
				// if the card is inside the intro text or body then it is an inline card
				var isInline = $this.parents("#cgvBody,#cgvIntroText")[0];
				var cardTitle = $this.children('h3').text();
				var linkText = event.target.tagName.toLowerCase() == "img"?"Image":$this.children('h3').text();
				var container = isInline?'InlineCard':'SlottedTopicCard';
				var containerIndex = i + 1;

				NCIAnalytics.CardClick(this, cardTitle, linkText, container, containerIndex);
			});
		});

		$("#nvcgSlSectionNav a").on('click.analytics',function(event){
			//event.preventDefault(); //uncomment when testing link clicks
			var $this = $(this),
				url = 'www.cancer.gov' + location.pathname.toLowerCase(),
				root = $this.closest(".level-0"),
				heading = $.trim(root.children(":first").text()),
				parent = root.find(".level-1").is(".has-children")?treeText($this.parents("li")).string:"",
				linkText = $this.text(),
				depth = treeText($this.parents("li")).depth
			;
			//console.log("url: " + url + "\nheading: " + heading  + "\nparent: " + parent + "\nlinkText: " + linkText + "\ndepth: " + depth);
			NCIAnalytics.SectionLinkClick(this,url,heading,linkText,depth,parent);
		});

		// Track clicks on video splash images on BRP that trigger YouTube video loads
		$('.feature .video').each(function(i, el) {
			$(el).on('click.analytics', 'a', function(event) {

				var $this = $(this),
					video = $this.attr("data-analytics"),
					pageName = window.location.hostname + window.location.pathname
				;

				NCIAnalytics.VideoSplashImageClick(this,video,pageName);
			});
		});
		$('.feature .icons').each(function(i, el) {
			$(el).on('click.analytics', 'a', function (event) {
				//event.preventDefault(); //uncomment when testing link clicks
				var $this = $(this),
					file = $this.attr("data-analytics"),
					pageName = window.location.hostname + window.location.pathname
				;

				NCIAnalytics.BRPiconClick(this, file, pageName);
			});
		});

		// Track accordion expand/collapse
		/// Note: this will only work for accordion items that have an ID set. 
		/// We will need to update published HTML for other accordion items to include an 'id' attribute and to verify 
		/// that they are following a consistent pattern across all pages
		$('.accordion section').each(function(i, el) {
			$(el).on('click', 'h2', function(event) {
				var $this = $(this);
				accordionId = $this.closest('.accordion').attr('id')
				sectionId = $this.closest('section').attr('id');				
				// Track only if the accordion wrapper has an ID
				if(accordionId) {
					if(!sectionId) {
						sectionId = 'none';
					}
					displayedName = $this.text();
					if (!displayedName) {
						displayedName = 'none';
					}
					action = 'expand';
					if($this.attr('aria-expanded') === 'false'){
						action = "collapse";
					}
					NCIAnalytics.AccordionClick($this, accordionId, sectionId, displayedName, action);
				}
			});
		});	

		$('.add_this_btn').each(function() {
			var $this = $(this);
			$this.on('click.analytics', $this, function(e) {
				NCIAnalytics.BookmarkShareClick(this);
			});
		});

		$('.po-font-resize a').on('click.analytics',function(e){
			var $this = $(this);
			//reset the mouseleave event on each click so it only reports once
			$this.off('mouseleave.analytics');

			//report the final font size on mouse leave of the icon
			$this.on('mouseleave.analytics',function(){
				//report font size after clicking is completed
				var target = $(".resize-content:first")[0]? $(".resize-content:first") : $("#cgvBody"),
					fontSize = parseInt(target.css("font-size")),
					fontStyle
				;

				if(fontSize < 19) {
					fontStyle = 'Normal';
				} else if(fontSize < 23) {
					fontStyle = 'Medium';
				} else if(fontSize < 27) {
					fontStyle = 'Large';
				} else {
					fontStyle = 'Extra Large';
				}
				NCIAnalytics.fontResizer(this,fontStyle);

				//unbind the mouseleave event to prevent reporting on casual mouseovers
				$this.off('mouseleave.analytics');
			});

		});
        
    	// Analytics Pilot - track all links under the following pages : headings:
        // grants-training/grants-process/overview : "How to Submit a Grant Application"
        // grants-training/grants-process/application/development : "Application Development Resources"
        // grants-training/grants-process/application/development : "Application Submission Resources"
        // grants-training/grants/funding-opportunities : "Funding Opportunities" 
    	jQuery('#how-to-submit-a-grant-application, #application-development, #application-submission-resources, #grants-funding-opportunities').find('a').on('click.analytics', function() {
            NCIAnalytics.GlobalLinkTrack({
                sender: this,
                label: jQuery(this).text(),
                eventList:'ogapreaward'
            }); 
        });

        // Analytics Pilot - track "grants" links under "Application Submission" section on /grants-training/grants-process/application/development
        jQuery('#application-submission').find('p a, ol a').on('click.analytics', function() {
            var href = jQuery(this).attr('href');
            if(href.indexOf('grants\.') > -1) {
                NCIAnalytics.GlobalLinkTrack({
                    sender: this,
                    label: jQuery(this).text(),
                    eventList:'ogapreaward' 
                }); 
            }
        });
    
        // Analytics Pilot - track links under "Pre-Award Activities" section on /grants-training/grants-process/application/award page
        jQuery("#pre-award-activities").find('a').on('click.analytics', function() {
            NCIAnalytics.GlobalLinkTrack({
                sender: this,
                label: jQuery(this).text(),
                eventList:'ogareceiving'
            }); 
        });

    	// Analytics Pilot - track links under Preparation of Awards and Obligation of Funds heading on /grants-training/grants-process/application/award page
        jQuery('h3:contains("Preparation of Awards")').nextAll().find('a').on('click.analytics', function() {
            NCIAnalytics.GlobalLinkTrack({
                sender: this,
                label: jQuery(this).text(),
                eventList:'ogareceiving'
            }); 
        });

        // Analytics Pilot - track post-award activity links on the following pages:
        // grants-training/grants-process/application/administration
        // grants-training/grants-process/rppr
        // grants-training/grants-process/grant-closeout
        jQuery('.post-award-links').find('a').on('click.analytics', function() {
            NCIAnalytics.GlobalLinkTrack({
                sender: this,
                label: jQuery(this).text(),
                eventList:'ogacloseout'
            }); 
        });
        if(location.pathname.indexOf('grants-training/grants-process/grant-closeout') > -1){
            jQuery('.related-resources').find('a').on('click.analytics', function() {
                var href = jQuery(this).attr('href'); 
                if(href.indexOf('grants\.') > -1) {
                    NCIAnalytics.GlobalLinkTrack({
                        sender: this,
                        label: jQuery(this).text(),
                        eventList:'ogacloseout'
                    }); 
                }
            });
        }

        jQuery("#apply").on("click", "a", function() {
			var linkText = jQuery(this).text();
			if(linkText.search(/^(download the)(.+)(award application)/gi) > -1) {
		    	NCIAnalytics.GlobalLinkTrack({
					sender: this, // html link element
			     	label:jQuery(this).text(), // text displayed to user
			     	eventList: 'cctappdownload' // event104
			    });
			}
		});

		// http://www.cancer.gov/grants-training/training/at-nci/apply
		jQuery("#predoctoral, #postdoctoral, #clinical-fellow, #postbaccalaureate").on("click", "a", function() {
		  var linkText = jQuery(this).text(),
		    events = (linkText && linkText.toLowerCase() === 'how to apply') ? 'ccthowtoapply' : ''; // event105

		  NCIAnalytics.GlobalLinkTrack({
		    sender: this, // html link element
		    label: linkText, // text displayed to user
		    eventList: events
		  }); 
		});
		
		// Analytics for components generated by JavaScript
		$(window).load(function(){

			$("#nvcgSlSectionNav button.toggle").on('click.analytics',function(event){

				var $this = $(this),
					url = 'www.cancer.gov' + location.pathname.toLowerCase(),
					root = $this.closest(".level-0"),
					heading = $.trim(root.children(":first").text()),
					tree = treeText($this.parents("li:not(.level-0)")).string,
					isExpanded = $this.attr("aria-expanded") == "true"
				;

				//console.log("url: " + url + "\nisExpanded: " + isExpanded  + "\nheading: " + heading  + "\nparent: " + parent + "\nevent: " + event.type);
				NCIAnalytics.SectionAccordionClick(this,url,isExpanded,heading,tree);
			});

			$('#section-menu-button').on('click.analytics',function(e){
				var sectionNav = $(".section-nav"),
					//sectionTitle = $.trim(sectionNav.find(".current-page").text()) //fetches current active element in the menu
					sectionTitle = $(".section-nav .level-0 a:first").text()
				;
				if(!sectionNav.is(".open")){
					NCIAnalytics.SectionMenuButtonClick(this,sectionTitle);
				}
			});
			
			// Track the "post resume" link on /grants-training/training/at-nci/apply
			$('#apply-training-post-resume').on('click.analytics', function(){
				NCIAnalytics.GlobalLinkTrack({sender: this, label: 'post-resume'});
			});

			/* 
				The tracking of click events on the table Enlarge button are handled
				within Enlarge.js. Since the button is generated dynamically within that file
				we are unable to bind click events to it here if the button does not yet exist.
			*/

			// Track app download links
			$('#app-download-iphone').on('click.analytics', function(){
				NCIAnalytics.GlobalLinkTrack({sender: this, label: 'download-fyi-app_iphone'});
			});
			$('#app-download-ipad').on('click.analytics', function(){
				NCIAnalytics.GlobalLinkTrack({sender: this, label: 'download-fyi-app_ipad'});
			});
			$('#app-download-android').on('click.analytics', function(){
				NCIAnalytics.GlobalLinkTrack({sender: this, label: 'download-fyi-app_android'});
			});


			// On the /grants-training/training/contact page we want to 
			// 1. Anchor click events to each of the items in the "On This Page" section
			// 2. Anchor click events to each of the email address links within the tables.
			var pathname = window.location.pathname;
			if(pathname.indexOf("/grants-training/training/contact") != -1){
				$('#cgvBody ul').eq(0).find('li').each(function(){
					$(this).find('a').on('click', function(){
						NCIAnalytics.GlobalLinkTrack({
						    sender:this, // html link element 
						    label:jQuery(this).text(), // text displayed to user
						});
					});
				});

				$('#cgvBody table tr td a').each(function(){ // each table
					if($(this).attr('href').indexOf("mailto:") != -1){
						$(this).on('click', function(){
							NCIAnalytics.GlobalLinkTrack({
								sender: this, // html link element
							    label: 'email-contact',
							}); 
						});						
					}
				});
			}

			// Add tracking for previous and next links on PDQ pages
			$(".previous-link, .next-link").on("click", "a", function() {
			    var linkText = jQuery(this).text();
			    linkText = linkText.replace(/[<>]/,'').trim();

			    NCIAnalytics.GlobalLinkTrack({
			        sender: this, // html link element
			        label: linkText // text displayed to user
			    });
			});

			// 	Track "Go to Health Professional Version" and 
			// "Go to Patient Version" links on PDQ pages.	
			$(".pdq-hp-patient-toggle").on("click", "a", function() {
			    NCIAnalytics.GlobalLinkTrack({
			        sender: this, // html link element
			        label: jQuery(this).text() // text displayed to user
			    });
			});


			var pageName = window.location.hostname + window.location.pathname;
			// Track clicks on blog archives accordion on all blog pages.
			$("#blog-archive-accordion").on("click", "a", function() {
				NCIAnalytics.BlogArchiveLinkClick(this, pageName);
			});

			// Track the expand/collapse of the accordion
			$("#blog-archive-accordion").on("click", "h3, h4", function(){
				var isClosing = !$(this).hasClass('ui-state-active');
				NCIAnalytics.BlogArchiveAccordionClick(this, window.location.hostname + window.location.pathname, isClosing);
			});

			$(".blogRSS").on("click", function(){
				NCIAnalytics.BlogSubscribeClick(this, pageName);
			});

			$('.cgvblogpost #cgvBody').on("click", "a",  function(){
				var $this = $(this);
				var linkText = $this.text();

				if($this.hasClass('definition')){
					NCIAnalytics.BlogBodyLinkClick(this, linkText, pageName, true);
				}
				else
					NCIAnalytics.BlogBodyLinkClick(this, linkText, pageName);
				
			});

			$('#nvcgRelatedResourcesArea').on("click", "a", function(){
				var $this = $(this);
				var linkText = $this.text();
				var index = $this.closest('li').index() + 1;
				NCIAnalytics.BlogRelatedLinksClick(this, linkText, pageName, index);
			});

			// Track clicks on feature cards on blog posts.
			$('.blog-feature .feature-card').each(function(i, el) {
				$(el).on('click', 'a', function(event) {
					var $this = $(this);
					var linkText = $this.children('h3').text();
					var containerIndex = i + 1;

					NCIAnalytics.BlogCardClick(this, linkText, containerIndex, pageName);
				});
			});

			// Track clicks on featured posts section of Blog Right Rail.
			$('.right-rail .managed.list.with-date li').each(function(i, el) {
				$(el).on('click', 'a', function(event) {
					var $this = $(this);
					var linkText = $this.text();
					var containerIndex = i + 1;

					NCIAnalytics.FeaturedPostsClick(this, linkText, containerIndex, pageName);
				});
			});

			// Track clicks on featured posts section of Blog Right Rail.
			$('.right-rail .managed.list.without-date li').each(function(i, el) {
				$(el).on('click', 'a', function(event) {
					var $this = $(this);
					var linkText = $this.text();
					var containerIndex = i + 1;

					NCIAnalytics.CategoryClick(this, linkText, containerIndex, pageName);
				});
			});

			// Track clicks on Older Posts/Newer Posts on Blog Series pages
			$('.blog-pager.clearfix').on("click", "a", function() {
				var $this = $(this);
				var pagerClass = $this.attr('class');
				var olderNewer = "";
				if (pagerClass == "older") {
					olderNewer = "Older";
				}
				else if (pagerClass == "newer") {
					olderNewer = "Newer";
				}

				NCIAnalytics.OlderNewerClick(this, olderNewer, pageName);
			});

			// Track clicks on Older Posts/Newer Posts on Blog Series pages
			$('#cgvSlPagination').on("click", "a", function() {
				var $this = $(this);
				var pagerClass = $this.parent().attr('class');
				var olderNewer = "";
				if (pagerClass == "blog-post-older") {
					olderNewer = "Older";
				}
				else if (pagerClass == "blog-post-newer") {
					olderNewer = "Newer";
				}

				NCIAnalytics.OlderNewerClick(this, olderNewer, pageName);
			});
		});
	})();
});
