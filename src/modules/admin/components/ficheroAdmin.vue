<template>
  <v-card>
    
    <v-toolbar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Facultad de Química</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-tabs="title">
          <v-tab 
            v-for="item in items" 
            :key="item" 
            :value="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-window v-model="tab">
      
      <v-tabs-window-item value="Ver usuarios">
        <v-card-text>
          <getUsuariosView/>
          </v-card-text>
      </v-tabs-window-item>

      <v-tabs-window-item value="Registrar usuario">
        <v-card-text>
          <postUsuariosView/>
          </v-card-text>
      </v-tabs-window-item>

      <v-tabs-window-item value="Actualizar usuario">
        <v-card-text>
          <putUsuariosView/>
        </v-card-text>
      </v-tabs-window-item>
 
      <v-tabs-window-item value="Dar de baja a usuario">
        <v-card-text>
          <h3>Aquí va el Formulario de Baja</h3>
        </v-card-text>
      </v-tabs-window-item>    

    </v-tabs-window>

  </v-card>
</template>

<script setup>
  import { ref } from 'vue'
  import getUsuariosView from '../views/getUsuariosView.vue';
  import postUsuariosView from '../views/postUsuariosView.vue';
  import putUsuariosView from '../views/putUsuariosView.vue';
  // Variable que controla qué pestaña está abierta
  const tab = ref(null)

  // Descomenté esto porque ES NECESARIO para que los botones de arriba existan
  const items = [
    'Ver usuarios',
    'Registrar usuario',
    'Actualizar usuario',
    'Dar de baja a usuario',
  ]
</script>