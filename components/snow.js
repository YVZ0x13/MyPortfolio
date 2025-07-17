const snow = {
    template: `
        <div ref="snowContainer" class="fixed top-0 left-0 w-full h-full pointer-events-none z-0"></div>
    `,
    mounted() {
        const container = this.$refs.snowContainer;
        let snowflakeCount = 0;
        const maxSnowflakes = window.innerWidth < 768 ? 20 : 50; // Fewer snowflakes on smaller screens
        const spawnInterval = window.innerWidth < 768 ? 500 : 200; // Slower spawn on smaller screens

        const createSnowflake = () => {
            if (snowflakeCount >= maxSnowflakes) return;

            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.style.left = Math.random() * window.innerWidth + 'px';
            snowflake.style.animationDuration = (5 + Math.random() * 5) + 's';
            snowflake.style.fontSize = (10 + Math.random() * 20) + 'px';
            snowflake.textContent = '🌸';

            container.appendChild(snowflake);
            snowflakeCount++;

            setTimeout(() => {
                snowflake.remove();
                snowflakeCount--;
            }, 10000);
        };

        this.snowInterval = setInterval(createSnowflake, spawnInterval);
    },
    unmounted() {
        clearInterval(this.snowInterval);
    }
}

export default snow;
