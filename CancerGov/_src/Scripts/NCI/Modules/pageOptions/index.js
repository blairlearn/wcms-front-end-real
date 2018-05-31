import { newWindow } from 'Utilities/popups';
import { getNodeArray, getMetaData } from 'Utilities/domManipulation';

// Currently we aren't using most of these tags since the services themselves are scraping the info they
// need. But I'm leaving this here as a point of reference ('og:title' is the only one being used
// at the moment, by Twitter) BB 3/2018
const metaTags = [
    ['property', 'og:url'],
    ['property', 'og:title'], 
    ['property', 'og:description'], 
    ['property', 'og:site_name'], 
    ['property', 'og:type'],
    ['name', 'twitter:card']
]

// These aren't being reused as of now, so this seems unnecessary of course
const FACEBOOK = 'facebook';
const TWITTER = 'twitter';
const GOOGLEPLUS = 'googleplus';
const PINTEREST = 'pinterest';
const EMAIL = 'email';
const PRINT = 'print';
const RESIZE = 'resize';

const facebookLink = url => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
const twitterLink = (url, {'og:title': text}) => `https://twitter.com/share?url=${encodeURIComponent(url)}&text=${text}`; //options = https://dev.twitter.com/web/tweet-button/parameters text/hashtags
const googleplusLink = url => `https://plus.google.com/share?url=${encodeURIComponent(url)}`;
const pinterestLink = url => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`;

const shareButtonsData = {
    FACEBOOK: {
        hook: '.social-share--facebook a',
        link: facebookLink,
        windowSettings: {},
        initialize: settings => node => {
            node.addEventListener('click', onClickShareButton(settings));
            return node;
        },
        initializeAnalytics: () => {},
    },
    TWITTER: {
        hook: '.social-share--twitter a',
        link: twitterLink,
        windowSettings: {},
        initialize: settings => node => {
            node.addEventListener('click', onClickShareButton(settings));
            return node;
        },
        initializeAnalytics: () => {},
    },
    GOOGLEPLUS: {
        hook: '.social-share--googleplus a',
        link: googleplusLink,
        windowSettings: {},
        initialize: settings => node => {
            node.addEventListener('click', onClickShareButton(settings));
            return node;
        },
        initializeAnalytics: () => {},
    },
    PINTEREST: {
        hook: '.social-share--pinterest a',
        link: pinterestLink,
        windowSettings: {
            width: 700
        },
        initialize: settings => node => {
            node.addEventListener('click', onClickShareButton(settings));
            return node;
        },
        initializeAnalytics: () => {},
    },
    EMAIL: {
        hook: '.page-options--email a',
        initialize: _ => node => {
            node.addEventListener('click', () => {
                const metaData = getMetaData(metaTags, document);
                const url = getURL(document, metaData);
                // TODO: This should be language specific
                const href = `mailto:?subject=Information from the National Cancer Institute Web Site&body=I found this information on www.cancer.gov and I'd like to share it with you: ${ url } \n\n NCI's Web site, www.cancer.gov, contains comprehensive information about cancer causes and prevention, screening and diagnosis, treatment and survivorship; clinical trials; statistics; funding, training and employment opportunities; and the institute and its programs. You can also get cancer information online through the LiveHelp instant messaging service at http://livehelp.cancer.gov. If you live in the United States, you may call the NCI's Cancer Information Service toll-free at 1-800-4-CANCER (1-800-422-6237) for cancer information in English and Spanish.`;
                const encodedHref = encodeURI(href);
                node.href = encodedHref;
                node.click();
            })
            return node;
        },
        initializeAnalytics: () => {},
    },
    PRINT: {
        hook: '.page-options--print a',
        initialize: settings => node => {
            node.addEventListener('click', e => {
                e.preventDefault();
                window.print();
            })
            return node;
        },
        initializeAnalytics: () => {},
    },
    RESIZE: {
        hook: '.page-options--resize a',
        initialize: settings => node => {
            
            const clickHandler = resizeableElements => {
                const multiplier = 1.2;
                let originalSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'), 10);
                let currentSize = 0;
                
                return e => {
                    e.preventDefault();
                    currentSize = parseFloat(window.getComputedStyle(resizeableElements[0]).getPropertyValue('font-size'), 10);
                    let newSize = currentSize * multiplier;
                    newSize = newSize > 30 ? originalSize : newSize;
                    resizeableElements.forEach(el => {
                        el.style.fontSize = newSize + "px";
                    })
                };
            }
            
            const resizeableElements = getNodeArray(".resize-content");
            if(resizeableElements.length){
                node.addEventListener('click', clickHandler(resizeableElements));
            }
            
            return node;
        },
        initializeAnalytics: () => {},
    }
};

// In the event that the metaData is not pulled down (which is a non-case as of this comment but might
// change shortly), we want to default to the opengraph url with the canonical as a fallback.
const getCanonicalURL = document => document.querySelector("link[rel='canonical']").href;
const getMetaURL = document => document.querySelector("meta[property='og:url']").getAttribute('content');
const getURL = (document, metaData) => {
    const metaURL = metaData ? metaData['og:url'] : getMetaURL(document);
    return metaURL ? metaURL : getCanonicalURL(document);
}

// We don't want to take the metadata until the share link has been activated (so that if some
// of it was changed dynamically, we can capture the new data)
// NOTE: If you're confused by the () => () => pattern, it's just currying with arrow functions.
// This function returns a function seeded with the 'type' data (which means we can pass variables
// in the eventlistener without a problem)
const onClickShareButton = ({ link, windowSettings }) => () => {
    const metaData = getMetaData(metaTags, document);
    const url = getURL(document, metaData);
    newWindow(link(url, metaData), windowSettings);
}

const getShareButtonNodes = (shareButtonsData) => {
    // Creating a new copy of the object. Why not use For...in instead of this more complicated
    // array reduction pattern? Because we don't want to iterate over any potential enumerables on the prototype.
    const shareButtons = Object.entries(shareButtonsData).reduce((acc, [type, settings]) => {
        const { hook, link, windowSettings, initialize, initializeAnalytics } = settings;
        const nodes = getNodeArray(hook)
            .map(initialize(settings))
            .map(initializeAnalytics)
        acc[type] = { hook, link, nodes, windowSettings };
        return acc;
    }, {})
    return shareButtons;
}

const initialize = () => {
    const shareButtons = getShareButtonNodes(shareButtonsData);
    return shareButtons;    
}

export default initialize;
