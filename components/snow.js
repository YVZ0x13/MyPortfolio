const snow = {
    template: `
        <div ref="snowContainer" class="fixed top-0 left-0 w-full h-full pointer-events-none z-0"></div>
    `,
    mounted() {
        const container = this.$refs.snowContainer;

        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.style.left = Math.random() * window.innerWidth + 'px';
            snowflake.style.animationDuration = (5 + Math.random() * 5) + 's';
            snowflake.style.fontSize = (10 + Math.random() * 20) + 'px';
            snowflake.textContent = '🌸';

            container.appendChild(snowflake);

            setTimeout(() => {
                snowflake.remove();
            }, 10000);
        }

        this.snowInterval = setInterval(createSnowflake, 200);
    },
    unmounted() {
        clearInterval(this.snowInterval);
    }
}

export default snow;
