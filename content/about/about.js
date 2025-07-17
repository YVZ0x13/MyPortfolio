const aboutContent = {
    // template: ``,
    // mounted() {

    // }
    data() {
        return {
            about_main: ''
        };
    },
    template: `<div ref="mainContent" v-html="about_main" class="opacity-0 translate-y-8 transition-all duration-700"></div>`,
    mounted() {
        fetch('content/about/about.html')
            .then(response => response.text())
            .then(html => {
                this.about_main = html;
                this.$nextTick(() => {
                    this.runAnimations();
                });
            })
            .catch(err => {
                console.error('Failed to load landing.html', err);
            });
    },
    methods: {
        runAnimations() {
            const section = this.$refs.mainContent;

            requestAnimationFrame(() => {
                section.classList.remove("opacity-0", "translate-y-8");
                section.classList.add("opacity-100", "translate-y-0");
            });
        }
    }
}


export default aboutContent;