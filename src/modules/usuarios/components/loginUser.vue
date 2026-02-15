<template>
    <div class="login-container">
        <h2>Iniciar Sesión</h2>
        
        <input 
            v-model="correo" 
            name="email"          id="email"
            placeholder="Correo electrónico"
        />

        <input 
            v-model="pass" 
            type="password" 
            name="password"             id="password" autocomplete="email"  prepend-inner-icon="mdi-email" variant="outlined"
            placeholder="Contraseña"
        />

        <button @click="procesoIngreso">Ingresar</button>
        
        <p v-if="mensaje">{{ mensaje }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";

import { loginUser } from "@/modules/usuarios/services/loginUser"; 

const correo = ref("");
const pass = ref("");
const mensaje = ref("");

const procesoIngreso = async() => {
    const respuesta = await loginUser({
        correo: correo.value,
        pass: pass.value,
    });

    if (respuesta && respuesta.status === 200) {
        mensaje.value = "¡Conexión Exitosa!";
    } else {
        mensaje.value = "Error en la conexión";
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 300px;
    margin: 50px auto;
}
</style>