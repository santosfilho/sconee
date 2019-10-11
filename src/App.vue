<template>
  <div id="app">
    <nav id="nav" class="navbar">
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/eventos">Eventos</router-link> |
      <router-link to="/equipamentos">Equipamentos</router-link> |
      <router-link to="/locais">Locais</router-link> |
      <router-link to="/categorias">Categorias</router-link> |
      <router-link to="/about">Sobre</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#nav {
  padding: 20px;
  font-size: 1.8rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #2196F3;
}
</style>
