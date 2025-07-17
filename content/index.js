import contentHTML from './landing/landing.js';
import aboutContent from './about/about.js';
import portfolioContent from "./portfolio/portfolio.js"
const appSection = {
    props: ['currentSection'],
    components: {
        contentHTML,
        aboutContent,
        portfolioContent
    },
    template: `
        <div>
            <component :is="getComponent"></component>
        </div>
    `,
    computed: {
        getComponent() {
            switch (this.currentSection) {
                case 'home':
                    return 'contentHTML';
                case 'about':
                    return 'aboutContent';
                case 'portfolio':
                    return 'portfolioContent'
                default:
                    return {
                        template: `<div><h1>{{ currentSection }} Content</h1></div>`,
                        props: ['currentSection'],
                    };
            }
        }
    }
};

export default appSection;
