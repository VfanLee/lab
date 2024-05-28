<template>
  <div>
    <header>
      <h1>App Header</h1>
      <nav>
        <ul>
          <li><NuxtLink to="/about">关于</NuxtLink></li>
          <li><NuxtLink to="/posts/1">文章1</NuxtLink></li>
          <li><NuxtLink to="/posts/2">文章2</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <slot />
    <h1>App Footer</h1>
  </div>
</template>
