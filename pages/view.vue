<template>
  <ViewSection v-if="viewSection" />

  <ViewAll v-else />
</template>

<script>
export default {
  name: 'ViewPage',

  computed: {
    viewSection() {
      return !!this.$route.query.section
    }
  }
}
</script>
