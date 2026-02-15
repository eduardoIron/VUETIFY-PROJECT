<template>
  <v-container>
    <v-responsive class="mx-auto" max-width="400">
      <h3 class="text-h5 mb-4">Registro de Usuario</h3>
      
      <v-text-field
        v-model="nombre"
        label="Nombre"
        variant="outlined"
        class="mb-2"
      ></v-text-field>

      <v-text-field
        v-model="numCuenta"
        label="Número de Cuenta"
        type="number"
        variant="outlined"
        class="mb-2"
      ></v-text-field>
      
      <v-text-field
        v-model="correo"
        label="Correo"
        type="email"
        variant="outlined"
        class="mb-2"
      ></v-text-field>

      <v-text-field
        v-model="pass"
        label="Contraseña"
        type="password"
        variant="outlined"
        class="mb-2"
      ></v-text-field>

      <v-text-field
        v-model="numCelular"
        label="Número Celular"
        type="tel"
        variant="outlined"
        class="mb-4"
      ></v-text-field>

      <v-btn
        color="primary"
        block
        size="large"
        :loading="cargando"
        @click="registroUsuario"
      >
        Registrar
      </v-btn>
    </v-responsive>

    <v-snackbar v-model="mostrarSnack" :color="colorSnack">
      {{ mensajeSnack }}
      <template v-slot:actions>
        <v-btn variant="text" @click="mostrarSnack = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { postUsuarios } from "@/modules/admin/services/adminServices";

const nombre = ref('');
const numCuenta = ref('');
const correo = ref('');
const pass = ref('');
const numCelular = ref('');
const cargando = ref(false); 

const mostrarSnack = ref(false);
const mensajeSnack = ref("");
const colorSnack = ref("error");

const registroUsuario = async () => {
    if (!nombre.value || !correo.value || !pass.value) {
        activateSnack("Llena los campos obligatorios", "warning");
        return;
    }

    cargando.value = true;

    try {
        const payload = {
            nombre: nombre.value,
            numCuenta: numCuenta.value,
            correo: correo.value,
            pass: pass.value,
            numCelular: numCelular.value 
        };

        const registro = await postUsuarios(payload);

        if (registro?.status === 200 || registro?.status === 201) {
            activateSnack("Usuario registrado con éxito", "success");
            limpiarCampos();
        } else {
            const errorMsg = registro?.data?.msg || "Error de conexión o servidor";
            activateSnack(errorMsg, "error");
        }

    } catch (error) {
        console.error(error);
        activateSnack("Error crítico en el cliente", "error");
    } finally {
        cargando.value = false;
    }
}

const activateSnack = (mensaje, color = "primary") => {
    mensajeSnack.value = mensaje;
    colorSnack.value = color;
    mostrarSnack.value = true;
};

const limpiarCampos = () => {
    nombre.value = '';
    numCuenta.value = '';
    correo.value = '';
    pass.value = '';
    numCelular.value = '';
};
</script>