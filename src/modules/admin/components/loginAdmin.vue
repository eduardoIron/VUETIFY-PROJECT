<!-- <template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
       
        @submit.prevent="ingresaAdmin"
      >
        <v-text-field
          v-model="correo"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="pass"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          placeholder="Enter your password"
          clearable
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup>
import {ref} from "vue";
import {loginAdmin} from "@/modules/admin/services/adminServices";

const correo = ref("");
const pass = ref("");
const mostrarSnack = ref(false);
const mensajeSnack = ref("");
const colorSnack = ref("error");


const ingresaAdmin = async () => 
{ 
    if (!correo.value || !pass.value) {
        activateSnack("Por favor llena todos los campos", "warning");
        return;
    }
    
    try {
        const respuesta = await loginAdmin({
            correo: correo.value,
            pass: pass.value,
        });

        if (respuesta && respuesta.status === 200) {
            
            sessionStorage.setItem("token", respuesta.data.token);
            sessionStorage.setItem("admin", correo.value);
            
            activateSnack("Bienvenido Administrador", "success");
            
            setTimeout(() => {
                router.push("/admin"); 
            }, 1000);

        } else {
            const errorMsg = respuesta?.data?.msg || "Datos de acceso inválidos";
            activateSnack(errorMsg, "error");
        }

    } catch (error) {
        console.error(error);
        activateSnack("Ocurrió un error en el servidor", "error");
    }

    // if (respuesta && respuesta.status === 200) {
    //     mensaje.value = "¡Conexión Exitosa!";
    // } else {
    //     mensaje.value = "Error en la conexión";
}

const activateSnack=(messageParam, color="primary")=>{
    message.value = messageParam;
    colorSnack.value= color;
    useActivator.value=true;
    setTimeout(() => {
        useActivator.value = false;
    }, 5000);
};
</script>
 -->
<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="ingresaAdmin">
        
        <v-text-field
          v-model="correo"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="pass"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          placeholder="Enter your password"
          clearable
          type="password" 
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>

    <v-snackbar v-model="mostrarSnack" :color="colorSnack">
      {{ mensajeSnack }}
    </v-snackbar>

  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; 
import { loginAdmin } from "@/modules/admin/services/adminServices";

const router = useRouter(); 
const form = ref(false);  
const loading = ref(false); 
const correo = ref("");
const pass = ref("");

const mostrarSnack = ref(false);
const mensajeSnack = ref("");
const colorSnack = ref("error");

const required = (v) => {
  return !!v || "Este campo es obligatorio";
};

const ingresaAdmin = async () => { 
    if (!form.value) return;

    loading.value = true;

    try {
        const respuesta = await loginAdmin({
            correo: correo.value,
            pass: pass.value,
        });

        if (respuesta && respuesta.status === 200) {
            
            sessionStorage.setItem("token", respuesta.data.token);
            sessionStorage.setItem("admin", correo.value);
            
            activateSnack("Bienvenido Administrador", "success");
            
            setTimeout(() => {
                router.push("/admin"); 
            }, 1000);

        } else {
            const errorMsg = respuesta?.data?.msg || "Datos de acceso inválidos";
            activateSnack(errorMsg, "error");
        }

    } catch (error) {
        console.error(error);
        activateSnack("Ocurrió un error en el servidor", "error");
    } finally {
        loading.value = false; 
    }
}

const activateSnack = (mensaje, color = "primary") => {
    mensajeSnack.value = mensaje;
    colorSnack.value = color;
    mostrarSnack.value = true;
};
</script>