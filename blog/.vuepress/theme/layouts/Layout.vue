<template>
  <div>
    <NotionBaseListLayout v-if="$pagination" />
    <Content v-else />
  </div>
</template>
