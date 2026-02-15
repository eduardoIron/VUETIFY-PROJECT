<template>
  <v-data-table-virtual
    :headers="headers"
    :items="listaUsuarios"
    :loading="cargando" 
    height="400"
    item-value="id"
    fixed-header
  ></v-data-table-virtual>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUsuarios } from "@/modules/admin/services/adminServices";

const headers = [
    { title: 'ID', align: 'start', key: 'id' },
    { title: 'Nombre', align: 'start', key: 'nombre' },
    { title: 'Numero de Cuenta', align: 'end', key: 'numCuenta' },
    { title: 'Correo', align: 'start', key: 'correo' },
    { title: 'Numero Celular', align: 'end', key: 'numCelular' },
    { title: 'Estado', align: 'center', key: 'estado' },
    { title: 'Rol', align: 'center', key: 'rol' },
];

const listaUsuarios = ref([]); 
const cargando = ref(false);   

const cargarDatos = async () => {
    cargando.value = true;
    try {
        const respuesta = await getUsuarios();
    
        if (respuesta.status === 200) {
            listaUsuarios.value = respuesta.data; 
        } else {
            console.error("Error al cargar usuarios", respuesta);
        }
    } catch (error) {
        console.error(error);
    } finally {
        cargando.value = false;
    }
};

onMounted(() => {
    cargarDatos();
});
</script>