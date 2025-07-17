const navigationBar = {
    template: `
    <nav class="relative z-10 flex justify-between items-center p-6 bg-sky-800">
        <div class="text-lg font-semibold">YVZ Portfolio</div>

        <ul class="hidden md:flex gap-8 text-base">
            <li><a @click="changeSection('home')" class="hover:text-sky-300 cursor-pointer">Home</a></li>
            <li><a @click="changeSection('about')" class="hover:text-sky-300 cursor-pointer">About Me</a></li>
            <li><a @click="changeSection('portfolio')" class="hover:text-sky-300 cursor-pointer">Portfolio</a></li>
            <li><a @click="changeSection('contact')" class="hover:text-sky-300 cursor-pointer">Contact</a></li>
        </ul>

        <div class="md:hidden">
            <button @click="displayMenu" class="focus:outline-none">
                <svg class="w-8 h-8 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
        </div>

    </nav>
        <ul ref="mobileMenu" 
            class="fixed top-0 left-0 w-full h-full bg-sky-800 flex flex-col items-center justify-center gap-8 text-base transform transition-transform duration-500 z-50 -translate-x-full">
            <li><a @click="changeSection('home')" class="hover:text-sky-300 cursor-pointer">Home</a></li>
            <li><a @click="changeSection('about')" class="hover:text-sky-300 cursor-pointer">About Me</a></li>
            <li><a @click="changeSection('portfolio')" class="hover:text-sky-300 cursor-pointer">Portfolio</a></li>
            <li><a @click="changeSection('contact')" class="hover:text-sky-300 cursor-pointer">Contact</a></li>
            <button @click="exitMenu" class="mt-8 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg">
                Close Menu
            </button>
        </ul>
    `,
    methods: {
        displayMenu() {
            this.$emit('open_nav')
        },
        changeSection(section) {
            this.$emit('update-section', section);
            this.exitMenu();
        },
        exitMenu() {
            this.$emit('close_nav')
        }
    },
    mounted() {
        console.log("Navigation component mounted");
    }
};

export default navigationBar;
