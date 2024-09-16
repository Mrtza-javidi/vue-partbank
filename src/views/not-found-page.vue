<template>
  <main id="not-found">
    <h1>۴۰۴</h1>
    <h1>صفحه مورد نظر یافت نشد!</h1>
  </main>
</template>
<style lang="scss" scoped>
#not-found {
  @include flex($direction: column);
  width: 100%;
  height: 100vh;
  background-color: var(--primary-color);
}
h1 {
  @include font-style(
    $family: "peyda-600",
    $size: 6rem,
    $color: var(--text-on-primary)
  );
}
</style>
