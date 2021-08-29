<template>
  <a :href="href" target="_blank"> <img :src="url" /> </a>
</template>
<script>
export default {
  name: "BlogIcon",
  props: ["name", "href"],
  computed: {
    url() {
      return `/assets/icons/${this.name}.png`;
    },
  },
};
</script>
<style scoped>
img {
  width: 48px;
  height: 48px;
}
</style>
