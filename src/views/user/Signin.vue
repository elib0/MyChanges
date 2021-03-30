<template>
  <v-row align="center" justify="center">
    <v-col
        cols="12"
        sm="12"
        md="4"
    >
      <div class="text-center">
<!--        <img width="350px" src="@/assets/images/logo.svg" alt="logo">-->
      </div>
      <v-card elevation="5" color="transparent">
        <v-toolbar dense dark>
          <v-toolbar-title>Entrar</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form @submit.prevent="handleLogin" v-model="valid">
          <v-card-text>
            <v-text-field
                :rules="[
                    value => !!value || 'El nombre de usuario es obligatorio.',
                    value => value.length > 3 || 'El nombre de usuario debe ser mayor a 3 caracteres.'
                  ]"
                v-model="request.email"
                outlined
                label="Correo Electronico"
                name="email"
                prepend-inner-icon="fa-envelope"
                type="text"
            />

            <v-text-field
                :rules="[
                    value => !!value || 'La contraseña es obligatoria.',
                    value => value.length >= 8 || 'La contraseña debe ser mayor o igual a 8 caracteres.'
                  ]"
                v-model="request.password"
                outlined
                id="password"
                label="Contraseña"
                name="password"
                prepend-inner-icon="fa-lock"
                type="password"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                outlined
                block
                type="submit"
                :loading="loading"
                color="primary"
                :disabled="!valid"
            >
              <v-icon left>fa-sign-in-alt</v-icon>
              Entrar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {UserError} from "@/types";

@Component({
  components: {},
})
export default class Signin extends Vue {
  public valid = false;
  public request = {
    email: '',
    password: ''
  }
  public error = null;
  public loading = false;

  async handleLogin () {
    this.loading = true;
    try {
      const response = await this.$store.dispatch('user/signin', this.request);

      if (response.message) {
        throw new UserError(response);
      }

      await this.$router.replace({ name: 'Home' });
      this.$root.toggleLoading();
    } catch (e) {
      this.$root.setSystemMessage(e);
      this.loading = false;
    }
    this.loading = false;
  }

  created(){
    this.$root.toggleLoading();
  }
}
</script>
