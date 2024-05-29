<template>
  <div class="card__container">
    <div class="card__title">Lorem</div>
    <img class="card__img" src="https://picsum.photos/200/100" alt="img" />
    <div class="card__content">
      <a href="#">Lorem</a>
      ipsum dolor sit amet consectetur adipisicing elit. Fugiat quasi optio modi placeat! Repellat labore temporibus, quos laboriosam ea a!
    </div>
  </div>
</template>

<style lang="scss">
.card__container {
  width: 340px;
  padding: 20px;
  border: 1px solid var(--card-border-color);
  box-shadow: var(--card-box-shadow);
  background-color: var(--card-bg-color);
  border-radius: 16px;
  transition: background-color 0.2s;

  .card__img {
    margin: 16px 0;
    width: 300px;
    height: 200px;
  }

  .card__title {
    font-size: 20px;
    font-weight: 700;
    color: var(--card-title-color);
    transition: color 0.1s;
  }

  .card__content {
    font-size: 14px;
    color: var(--card-content-color);
    transition: color 0.1s;
  }
}
</style>
