<template>
  <article class="min-h-screen">
    <ShopCampaigns />
    <ShopNewArrivals />
    <ShopCategories />
    <ShopItemsOnSale />
  </article>
</template>

<script>
export default {
  name: 'HomePage',
  head() {
    return {
      title: 'Shop'
    }
  }
}
</script>
