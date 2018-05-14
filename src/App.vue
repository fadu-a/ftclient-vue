<template>
  <div id="app">
    <b-navbar
      :sticky="true"
      toggleable="md"
      type="dark"
      variant="dark">
      <b-navbar-toggle target="nav_collapse"/>
      <b-navbar-brand to="/">FADU</b-navbar-brand>
      <b-collapse
        id="nav_collapse"
        is-nav>
        <b-navbar-nav>
          <b-nav-item to="/runners">Runners</b-nav-item>
          <b-nav-item to="/fio/presets">Presets</b-nav-item>
          <b-nav-item to="/fio/testcases">Testcases</b-nav-item>
          <b-nav-item to="/fio/scenarios">Scenarios</b-nav-item>
          <b-nav-item to="/fio/results">Results</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="my-4"/>

    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
