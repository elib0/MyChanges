<template>
  <div class="user-layout fill-height">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Layout extends Vue {}
</script>
