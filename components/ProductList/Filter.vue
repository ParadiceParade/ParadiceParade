<template>
  <div
    aria-label="press ctrl  + s to apply filters"
    class="sm:border-l-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10 h-full grid grid-rows-[auto,1fr,auto] focus:outline-none"
    @keydown="saveOnKeydown"
  >
    <header
      class="flex items-center justify-between h-[56px] sm:h-[64px] px-3 sm:px-4 border-b-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10"
    >
      <h2 class="font-semibold">Filter by</h2>

      <Button title="close filters" icon size="lg" @click="closeDialog">
        <MdiWindowClose class="text-2xl" />
      </Button>
    </header>

    <div class="h-full overflow-y-auto overscroll-contain">
      <div
        v-for="(item, key) in collapsibles"
        :key="key"
        class="border-b-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10"
      >
        <h3
          class="p-2 sm:p-3 relative cursor-pointer"
          :class="{
            'bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5': item.active,
          }"
          @click.self="item.active = !item.active"
        >
          <button
            class="w-full h-[48px] flex items-center justify-between px-3 hover:opacity-100 sm:text-[0.9rem]"
            :class="{
              'font-semibold opacity-90 ': item.active,
              'opacity-75': !item.active,
            }"
            @click="item.active = !item.active"
          >
            {{ key }}

            <Component :is="item.active ? 'MdiMinus' : 'MdiPlus'" class="opacity-75" />
          </button>
        </h3>

        <div
          v-if="item.active"
          class="fade-slide-y-appear px-6 pt-6 pb-8 grid gap-y-6"
          style="--slide-y: -4px"
        >
          <label
            v-for="(option, id) in item.items"
            :key="id"
            :for="`${key}-${option.title}`.toLowerCase()"
            class="grid grid-flow-col justify-start gap-x-3 items-center cursor-pointer"
          >
            <span class="relative group flex justify-center items-center">
              <input
                :id="`${key}-${option.title}`.toLowerCase()"
                v-model="option.active"
                type="checkbox"
                class="sr-only"
              />

              <Component
                :is="`Mdi-${option.active ? 'Checkbox' : 'BlankCheckbox'}`"
                class="group-focus-within:ring text-2xl rounded ring-primary-800 dark:ring-primary-600"
                :class="{
                  'text-primary-600 dark:text-primary-400': option.active,
                  'opacity-75': !option.active,
                }"
              />
            </span>

            <span class="opacity-75 hover:opacity-90">
              {{ option.title }}
            </span>
          </label>
        </div>
      </div>

      <div class="flex items-center pt-8 pb-[72px] justify-between px-6 group">
        <label
          for="show-av-items"
          class="text-[0.9rem] opacity-75 hover:opacity-90 cursor-pointer flex-grow"
        >
          Show only available items
        </label>

        <Toggle
          id="show-av-items"
          v-model="showAvailableItems"
          tabindex="1"
          class="rounded-full ring-offset-2 ring-offset-white dark:ring-offset-black group-focus-within:ring ring-primary-800 dark:ring-primary-600"
        />
      </div>
    </div>

    <footer
      class="flex justify-between items-center px-6 py-4 border-t-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10"
    >
      <Button
        v-for="(action, i) in footerActions"
        :key="i"
        v-bind="{
          ...action.attrs,
          size: 'sm',
        }"
        :class="action.class"
        v-on="action.events"
      >
        <Component :is="action.icon" v-if="action.icon" />

        {{ action.title }}
      </Button>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { eventKey, nextAnimFrame } from "~/utils/main";
export default {
  name: "ProductListFilter",

  data: () => ({
    collapsibles: {
      Campaign: {
        active: false,
        items: [
          {
            title: "Welcome to paradice",
            active: false,
          },
          { title: "Broken chains", active: false },
        ],
      },

      Category: {
        active: false,
        items: [
          {
            title: "Shirts",
            active: false,
          },
          { title: "Shorts", active: false },
          { title: "Tees", active: false },
          {
            title: "Sweatpants",
            active: false,
          },
        ],
      },

      Color: {
        active: false,
        items: [
          {
            title: "Blue",
            active: false,
          },
          { title: "Green", active: false },
          { title: "Black", active: false },
          {
            title: "Multicolor",
            active: false,
          },
        ],
      },
      Size: {
        active: false,
        items: [
          { title: "One size", active: false },
          {
            title: "SM",
            active: false,
          },
          { title: "MD", active: false },
          { title: "LG", active: false },
        ],
      },
    },

    showAvailableItems: false,
  }),

  computed: {
    ...mapState(["productsList"]),

    footerActions() {
      return [
        {
          title: "Reset",
          attrs: {
            link: true,
          },
          events: {
            click: this.resetFilters,
          },
          class: "ml-0",
        },
        {
          title: "Apply filters",
          attrs: {
            primary: true,
          },
          icon: "MdiCheck",
          events: {
            click: this.applyFilters,
          },
        },
      ];
    },

    sectionTitle() {
      return this.$route.query.section;
    },
  },

  created() {
    const savedFilters = this.productsList.filters[this.sectionTitle] || {};

    // check if there's a saved filter state,
    if (Object.keys(savedFilters).length) {
      // restore any saved filter from vuex;
      if (savedFilters.Availability) {
        this.showAvailableItems = true;
      }

      const removeReactivity = (obj) => {
        if (typeof obj != "object") return {};

        const toString = JSON.stringify(obj);

        return JSON.parse(toString);
      };

      this.collapsibles = {
        ...this.collapsibles,
        ...removeReactivity(savedFilters),
      };

      // remove any possible non object saved to section's filter in vuex;
      for (const key in this.collapsibles) {
        if (typeof this.collapsibles[key] != "object") {
          delete this.collapsibles[key];
        }
      }
    }
    // else expand the first filter
    else {
      const firstFilter = Object.keys(this.collapsibles)[0];

      this.collapsibles[firstFilter].active = true;
    }
  },

  methods: {
    closeDialog() {
      this.$commit("UPDATE", {
        path: "active",
        innerPath: "dialog",
        value: false,
      });
    },

    resetFilters() {
      for (const key in this.collapsibles) {
        const value = this.collapsibles[key];

        if (typeof value == "object") {
          value.items.forEach((x) => (x.active = false));
        }
      }

      this.showAvailableItems = false;
    },

    async saveFilters() {
      await this.$nextTick();

      const filtered = {};

      if (this.showAvailableItems) {
        filtered.Availability = true;
      }

      // create new entries of applied filters;
      // then map so applied filters will always be saved in an expanded state
      const appliedFilters = Object.fromEntries(
        (
          Object.entries(this.collapsibles).filter(
            (entry) =>
              // return only entries that have an item in entry[1].items
              // active;
              typeof entry[1] == "object" && entry[1].items.find((x) => x.active)
          ) || []
        ).map((entry) => [entry[0], { ...entry[1], active: true }])
      );

      // assign entries to const filtered
      Object.assign(filtered, appliedFilters);

      await nextAnimFrame();

      return this.$commit("UPDATE", {
        path: this.sectionTitle,
        innerPath: "productsList.filters",
        value: filtered,
      });
    },

    async applyFilters() {
      await this.saveFilters();

      await this.$nextTick();

      this.closeDialog();
    },

    // save on ctrl + s
    async saveOnKeydown(e) {
      const key = eventKey(e);

      if (key == "s" && e.ctrlKey) {
        e.preventDefault();

        await this.applyFilters();
      }
    },
  },
};
</script>
