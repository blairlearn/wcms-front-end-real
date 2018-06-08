import { newWindow } from 'Utilities/popups';
import {
    onClickShareButton,
    onClickAnalytics,
    getContent,
} from '../utilities';

const customTweet = {
    hook: 'a.social-share--custom-tweet',
    textContent: {
        title: {
            'en': () => 'Share on Twitter',
        },
    },
    classList: ['tl-link'],
    initialize: language => settings => node => {
        // Set up the node attributes that a content owner doesn't need to be responsible for
        const title = getContent(settings.textContent.title, language)();
        node.title = title;        
        settings.classList.forEach(className => node.classList.add(className));
        node.href = "#";

        // Extract attributes added by content owner to build a custom tweet window event
        const customTitle = node.dataset.title || '';
        const url = node.dataset.url || '';
        const link = `https://twitter.com/share?url=${ encodeURIComponent(url) }&text=${ encodeURI(customTitle) }`;

        const customTweetClickHandler = event => {
            newWindow(link);
        }

        node.addEventListener('click', customTweetClickHandler);
        return node;
    },
    initializeAnalytics: node => {
        const tlCode = node.dataset.tlCode || '';
        const detail = {
            type: 'CustomTweetClick',
            args: [tlCode]
        };
        node.addEventListener('click', onClickAnalytics({ node, detail }))
        return node;
    },
};

export default customTweet;