<template>
  <div>
    <FeishuBaseListLayout v-if="$pagination" />
    <Content v-else />
  </div>
</template>
