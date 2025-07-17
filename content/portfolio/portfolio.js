const aboutContent = {
    // template: ``,
    // mounted() {

    // }
    data() {
        return {
            portfolio_main: ''
        };
    },
    template: `<div ref="mainContent" v-html="portfolio_main" class="opacity-0 translate-y-8 transition-all duration-700"></div>`,
    mounted() {
        fetch('content/portfolio/portfolio.html')
            .then(response => response.text())
            .then(html => {
                this.portfolio_main = html;
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
            setInterval(this.updateTime, 60000); // Update every 60 seconds
            this.updateTime();

        },
        updateTime() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // The hour '0' should be '12'
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('current-time').textContent = `${hours}:${formattedMinutes} ${ampm}`;
        }
    }
}


export default aboutContent;