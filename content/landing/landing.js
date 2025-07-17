const contentHTML = {
    data() {
        return {
            landingContent_main: ''
        };
    },
    template: `<div ref="mainContent" v-html="landingContent_main" class="opacity-0 transform translate-y-[-20px] transition-all duration-700 relative z-10"></div>`,
    mounted() {
        fetch('content/landing/landing.html')
            .then(response => response.text())
            .then(html => {
                this.landingContent_main = html;
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
            const words = ['HTML', 'CSS', 'Javascript', 'PHP', 'Godot 4', 'Java'];

            const typewriter = this.$refs.mainContent.querySelector('#typewriter');
            const content = this.$refs.mainContent;

            if (!typewriter) {
                console.warn('Typewriter element not found in loaded HTML.');
                return;
            }

            content.classList.add("opacity-0", "translate-y-[-20px]");

            requestAnimationFrame(() => {
                content.classList.remove("opacity-0", "translate-y-[-20px]");
                content.classList.add("opacity-100", "translate-y-0");
            });

            const typeWord = (word, index, callback) => {
                if (index < word.length) {
                    typewriter.textContent += word.charAt(index);
                    setTimeout(() => typeWord(word, index + 1, callback), 200);
                } else {
                    setTimeout(callback, 1000);
                }
            };

            const deleteWord = (callback) => {
                if (typewriter.textContent.length > 0) {
                    typewriter.textContent = typewriter.textContent.slice(0, -1);
                    setTimeout(() => deleteWord(callback), 100);
                } else {
                    setTimeout(callback, 1000);
                }
            };

            const typeWords = (wordsArray, index = 0) => {
                const currentWord = wordsArray[index % wordsArray.length];
                typeWord(currentWord, 0, () => {
                    deleteWord(() => {
                        typeWords(wordsArray, index + 1);
                    });
                });
            };

            typeWords(words);
        }
    }
};

export default contentHTML;
