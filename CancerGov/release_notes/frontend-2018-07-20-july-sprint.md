# Frontend-2018-07-20: FEQ Bucket Release (508 and Architecture Tickets)

## [WCMSFEQ-1070] CTListing loading before Common.js

To preserve order of execution, CTListing needs to be set to defer. This is a change to the velocity templates: DynamicTrialListingPageDesc.vm and TrialListingPageDesc.vm.

##  [WCMSFEQ-1063] Roll ContentPage into Common

Instead of two global js files being requested on each page, we will only have one. Other tickets will ideally pare this file down.

Content changes are required to make sure all the Percussion templates are no longer slotting in ContentPage.

## [WCMSFEQ-1052] Add Aria-Label to pageoptions for 508 compliance

The title attribute was felt to be insignificant for 508 purposes on the empty anchor tags used in the page options (as click handler targets). This change sets the title content as the aria-label as well, both in english and in spanish as a part of the template and of the pageOptions module.

## [WCMSFEQ-1055] jquery-ui.selectmenu 508 fix

Jquery UI's selectmenu module does not properly add in 508 compliance. Using the built in _super() method, we are able to extend the drawbutton method to add in aria labels after seletmenu draws an element to the page.

## [WCMSFEQ-940] Remove Right Padding on Last Feature Guide Card

Small CSS only tweak.

## [WCMSFEQ-1040] Remove Modernizr dependency

The now-unnecessary Modernizr library adds a small amount of weight and build complexity. Removing it required JS, CSS, and build changes.

## [WCMSFEQ-659] Move analytics code out of Common.js

The last remaining block of analytics code remaining in Common.js was refactored to analytics.js with it's brothers in arms.

## [WCMSFEQ-982] Fix video thumbnail not showing in accordions on CTHP

Images were disabled to save space before we started using videos in CTHP cards. The video preview image was also being disabled of course, but to ill effect. CSS change to CTHP.scss.

## [WCMSFEQ-1029] CTHP Dropdown obstructed by Video Thumbnail

Issues with CSS Nano minifying z-indexes (which is a known issue with the library and targetted for a bugfix in the next release) means when z-indexes exist in two different stylesheets they are unpredictable. For now, it means overrides will have to be in a common file to both rules (so moving the z-index rule from CTHP to nvcg where the video thumbnail rules are fixes it).

## [WCMSFEQ-665] NCI Cancer Genetics Services Directory is not showing the details of professionals when they are selected from more than one page

There are multiple problems with this form. New CSS (_directory-search.scss) and JS (directory-search-results.js) have been added to correct the form behavior and to add the new feature of preserving checkbox selections between page results. This is done in a similar manner to CTS search results where the checked items are store in Session Storage. Accessibility of this form has also been addressed as best we can without CDE changes.

## [WCMSFEQ-740] Page Options on Blog Page - replace media query with matchMedia

The manual moving around of the page options on Blog Pages was not syncing between the JS and CSS ways of reading window width. Changing the code to use matchMedia instead solves this. I also refactored the changed code into a utility function as it was being replicated across Blog Post and Blog Series Page types.

## [WCMSFEQ-1071] Problem with "Print this page"

Font size for DCEG print pages was reported to be too small, 12px. Upped the font size to 16px. Change was made to file \DCEG\Stylesheets\layout.print.css.

## [WCMSFEQ-939] Remove Collapse class from Guide Card title in Sublayout template

For whatever reason, .collapse was added to the container div for Guide Card titles. I say whatever because it seems to have no effect except to remove the desired padding at all breakpoints. There is still a CSS rule manually hiding the title itself. So removing this class had no apparent, deleterious effect except to restore the padding. This change requires uploading all the templates again and republishing CDE (but we do that anyway on every release).

## [WCMSFEQ-1028] Home Page Guide Cards Redesign

Minor release that changes the appearance of the first two guide cards on the homepage only.  
1. Removed light blue background color from the first guide card on the homepage (to match the other two guide cards).
2. Bottom align the "view more" links in all three cards.  
3. Updated color of the arrow for the "view more" links to use the dark blue chevron.
4. Added '.card__view-more' class to CSS in order to target the last (find/view/learn more) item for scalability, rather than use the pseudo class ':last-child' 


# Content Changes

## [WCMSFEQ-1028] Guide Cards
1. In Percussion, go to Homepage/Homepage Guide Cards and switch to the CancerGov community. 
2. Go the appropriate guide card content type (Content Block), revise, select Tools > Source Mode add the following to the last item of the list: 
 ```html   
 <li class="card__view-more"><a class="arrow-link" href="relative path here">link name here</a></li> 
 ```
in order to add the "view/find/learn more" link to the bottom of the list.

