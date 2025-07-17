const aboutContent = {
  // Component's reactive data properties
  data() {
    return {
      // Holds the HTML content fetched from the portfolio.html file
      portfolioMain: '',
      // Reference to the container element where app tiles will be rendered
      appTilesContainer: null,
      // Structured content for different categories of tiles
      tileContents: {
        game: [{
            type: 'iframe',
            src: "https://itch.io/embed/3707976?border_width=2&amp;dark=true",
            alt: "Nier : Athlon by Yuzuki Kouta"
          },
          {
            type: 'iframe',
            src: "https://itch.io/embed/2277518?border_width=2&amp;dark=true",
            alt: "Nier Spiegelbild Ver.0001 (Alpha) by Yuzuki Kouta"
          },
          {
            type: 'text',
            content: "More Games Coming Soon...",
            textColor: "text-gray-600"
          },
          {
            type: 'text',
            content: "New Releases",
            textColor: "text-gray-600"
          }
        ],
        website: [{
            type: 'text',
            content: "Google Search",
            textColor: "text-gray-600"
          },
          {
            type: 'text',
            content: "Wikipedia",
            textColor: "text-gray-600"
          },
          {
            type: 'text',
            content: "Your Website Here",
            textColor: "text-gray-600"
          },
          {
            type: 'text',
            content: "Web App Ideas",
            textColor: "text-gray-600"
          }
        ],
        video: [{
            type: 'text',
            content: "Video 1 Placeholder",
            textColor: "text-gray-600"
          },
          {
            type: 'text',
            content: "Video 2 Placeholder",
            textColor: "text-gray-600"
          },
          {
            type: 'text',
            content: "Watch More Videos",
            textColor: "text-gray-600"
          },
          {
            type: 'text',
            content: "Recommended Clips",
            textColor: "text-gray-600"
          }
        ],
        stars: [{
            type: 'text',
            content: "Favorite Item 1",
            textColor: "text-gray-600"
          },
          {
            type: 'text',
            content: "Favorite Item 2",
            textColor: "text-gray-600"
          },
          {
            type: 'text',
            content: "Starred Content",
            textColor: "text-gray-600"
          },
          {
            type: 'text',
            content: "Your Top Picks",
            textColor: "text-gray-600"
          }
        ]
      }
    };
  },

  // Vue component template
  template: `
    <div ref="mainContent" v-html="portfolioMain" class="opacity-0 translate-y-8 transition-all duration-700">
    </div>`,

  // Lifecycle hook called after the instance is mounted
  mounted() {
    this.loadPortfolioContent();
  },

  // Component methods
  methods: {
    /**
     * Loads the portfolio.html content and initializes the component.
     */
    async loadPortfolioContent() {
      try {
        const response = await fetch('./content/portfolio/portfolio.html');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.portfolioMain = await response.text();

        // Ensure DOM is updated before running animations and tile rendering
        this.$nextTick(() => {
          this.initializeDynamicElements();
          this.runEntranceAnimation();
          this.appTilesContainer = document.getElementById('app-tiles-container');
          // Render initial set of tiles (e.g., "game" category)
          this.renderTiles("game");
        });
      } catch (err) {
        console.error('Failed to load portfolio.html:', err);
      }
    },

    /**
     * Runs the entrance animation for the main content section.
     */
    runEntranceAnimation() {
      const section = this.$refs.mainContent;
      requestAnimationFrame(() => {
        section.classList.remove("opacity-0", "translate-y-8");
        section.classList.add("opacity-100", "translate-y-0");
      });
    },

    /**
     * Initializes dynamic elements like time display and navigation icon hovers.
     */
    initializeDynamicElements() {
      // Set up time update interval
      setInterval(this.updateTime, 60000); // Update every 60 seconds
      this.updateTime(); // Initial call to display time immediately

      this.setupNavIconHoverEffects();
      this.setupNavIconClickHandlers();
    },

    /**
     * Sets up mouseover and mouseout event listeners for navigation icons
     * to display hover text.
     */
    setupNavIconHoverEffects() {
      const navIcons = document.querySelectorAll('.nav-icon');
      const hoverTextDisplay = document.getElementById('hover-text-display');
      let hideTimeout; // Variable to store the timeout ID for hiding text

      const showHoverText = (text) => {
        clearTimeout(hideTimeout); // Clear any pending hide timeout
        hoverTextDisplay.textContent = text;
        hoverTextDisplay.classList.remove('opacity-0');
        hoverTextDisplay.classList.add('opacity-100');
      };

      const hideHoverText = () => {
        hideTimeout = setTimeout(() => {
          hoverTextDisplay.classList.remove('opacity-100');
          hoverTextDisplay.classList.add('opacity-0');
          // Clear text after the transition for a cleaner look
          setTimeout(() => {
            hoverTextDisplay.textContent = '';
          }, 300); // Matches the transition duration
        }, 100); // Shorter delay for hiding
      };

      navIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => showHoverText(icon.dataset.text));
        icon.addEventListener('mouseout', hideHoverText);
      });

      // Keep text visible if mouse re-enters its area or leaves its area
      hoverTextDisplay.addEventListener('mouseover', () => clearTimeout(hideTimeout));
      hoverTextDisplay.addEventListener('mouseout', hideHoverText);
    },

    /**
     * Sets up click event listeners for navigation icons to render different tile categories.
     */
    setupNavIconClickHandlers() {
      const navIcons = document.querySelectorAll('.nav-icon');
      navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
          const category = icon.dataset.category;
          if (category) {
            this.renderTiles(category);
          }
        });
      });
    },

    /**
     * Renders tiles based on the specified category into the appTilesContainer.
     * @param {string} category - The category of tiles to render (e.g., 'game', 'website').
     */
    renderTiles(category) {
      if (!this.appTilesContainer) {
        console.warn('appTilesContainer not found. Cannot render tiles.');
        return;
      }

      this.appTilesContainer.innerHTML = ''; // Clear previous tiles

      const tilesToRender = this.tileContents[category];

      if (!tilesToRender) {
        console.warn(`No tiles found for category: ${category}`);
        return;
      }

      tilesToRender.forEach(tileData => {
        const tileDiv = document.createElement('div');
        tileDiv.className = "glass-tile rounded-2xl flex items-center justify-center font-bold w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56";

        if (tileData.type === 'iframe') {
          const iframe = document.createElement('iframe');
          iframe.loading = 'lazy';
          iframe.frameBorder = '0'; // Use camelCase for JS property
          iframe.src = tileData.src;
          iframe.className = 'w-full h-full rounded-2xl';
          iframe.style.pointerEvents = 'auto'; // Ensure iframe content is interactive
          tileDiv.appendChild(iframe);
        } else if (tileData.type === 'text') {
          const h3 = document.createElement('h3');
          h3.className = tileData.textColor || "text-gray-600"; // Use specified color or default
          h3.textContent = tileData.content;
          tileDiv.appendChild(h3);
        }
        this.appTilesContainer.appendChild(tileDiv);
      });
    },

    /**
     * Updates the displayed current time.
     */
    updateTime() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // The hour '0' should be '12'
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

      const timeElement = document.getElementById('current-time');
      if (timeElement) {
        timeElement.textContent = `${hours}:${formattedMinutes} ${ampm}`;
      } else {
        console.warn("Element with ID 'current-time' not found.");
      }
    }
  }
};

export default aboutContent;