<template>
  <div id="outline" ref="outline">
    <div id="graph"></div>
  </div>
</template>

<script>
import { createGraph } from "./lib/g6";
import { TreeNode } from "./lib/tree";
export default {
  name: "TagsGraph",
  computed: {
    content() {
      const tree = new TreeNode();
      this.pages.forEach((page) => {
        const [level, ...tagsArray] = page.frontmatter.tags || [];
        tagsArray.forEach((tag) => {
          tree.addChildByPath(tag, level);
        });
      });
      return tree.dump();
    },
    pages() {
      return this.$site.pages;
    },
  },
  mounted() {
    const graph = createGraph(this.$refs.outline.offsetWidth);
    graph.on("node:click", (evt) => {
      const url = evt.item.getModel().url;
      if (url) {
        this.$router.push(url);
      }
    });
    graph.data(this.content);
    graph.render();
    graph.fitView();
  },
};
</script>

<style scoped>
#outline {
  border-style: solid;
}
</style>
