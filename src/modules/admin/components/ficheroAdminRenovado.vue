<template>
  <v-sheet border rounded>
    <v-data-table
      :headers="headers"
      :hide-default-footer="listaUsuarios.length < 11"
      :items="listaUsuarios"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start></v-icon>

            Facultad de quimica
          </v-toolbar-title>
            <div class="d-flex justify-center w-100">
              <v-btn
                class="me-2"
                prepend-icon="mdi-plus"
                rounded="lg"
                text="Registrar usuario"
                border
                @click="add"
              ></v-btn>
            </div>

            <div>
              <v-btn
                class="me-2"
                color="blue"
                rounded="lg"
                text="Cerrar sesion"
                border
                @click="salir"
              >
              </v-btn>
            </div>
        </v-toolbar>
      </template>

      <template v-slot:item.title="{ value }">
        <v-chip :text="value" border="thin opacity-25" prepend-icon="mdi-book" label>
          <template v-slot:prepend>
            <v-icon color="medium-emphasis"></v-icon>
          </template>
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          border
          @click="reset"
        ></v-btn>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :title="`${isEditing ? 'Editar' : 'Registrar'} usuario`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="formModel.nombre" :rules="[rules.requerido]" label="Nombre(Empezando por apelidos )"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model.number="formModel.numCuenta" :rules="[rules.requerido, rules.numeroCuenta, rules.numeroCuentaLongitud]" label="Numero de cuenta"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="formModel.correo" :rules = "[rules.requerido, rules.correo]" label="Correo"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="formModel.pass" :rules = "[rules.requerido]" label="Contraseña"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="formModel.numCelular" :rules = "[rules.requerido, rules.numeroTelefono]" label="Numero celular"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select v-model="formModel.rol" :items="['ADMIN_USER', 'USER']" label="Rol"></v-select>
          </v-col>


        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

        <v-snackbar v-model="mostrarSnack" :color="colorSnack">
      {{ mensajeSnack }}
    </v-snackbar>
</template>
<script setup>
import { onMounted, ref, shallowRef, toRef } from 'vue'
import { getUsuarios } from "@/modules/admin/services/adminServices";
import { postUsuarios } from "@/modules/admin/services/adminServices";
import { putUsuarios } from "@/modules/admin/services/adminServices";
import { deleteUsuarios } from "@/modules/admin/services/adminServices";
import { useRouter } from "vue-router"; 
import {rules} from "@/modules/admin/constants/rules";

  const currentYear = new Date().getFullYear()

  function createNewRecord () {
    return {
      nombre: '',
      numCuenta: '',
      correo: '',
      pass: '',
      numCelular: '',
      estado: '',
      rol: ''
    }
  }



  const books = ref([])
  const formModel = ref(createNewRecord())
  const dialog = shallowRef(false)
  const isEditing = toRef(() => !!formModel.value.id)

  const listaUsuarios = ref ([]);
    const mostrarSnack = ref(false);
   const mensajeSnack = ref("");
   const colorSnack = ref("error");
   const router = useRouter(); 

  const headers = [
   { title: 'ID', key: 'id', align: 'start' },
   { title: 'Nombre', key: 'nombre' },
   { title: 'Numero de cuenta', key: 'numCuenta' },
   { title: 'Correo', key: 'correo', align: 'end' },
   { title: 'Numero celular', key: 'numCelular', align: 'end' },
   { title: 'Estado', key: 'estado', align: 'end', sortable: false },
   { title: 'Rol', key: 'rol', align: 'end', sortable: false },
   {title:'Acciones', key:'actions', align:'end', sortable:false},
 ]

  onMounted(() => {
    reset()
  })


const add = () => {
    formModel.value = createNewRecord(); 
    dialog.value = true; 
}

    const edit = async(id) => {
    const found = listaUsuarios.value.find(listaUsuarios => listaUsuarios.id === id)

    formModel.value = {
      id: found.id,
      nombre: found.nombre,
      numCuenta: found.numCuenta,
      correo: found.correo,

      numCelular: found.numCelular,
      estado: found.estado,
      rol: found.rol,
    }

    dialog.value = true
  }

   const remove = async(id) => {
    const index = listaUsuarios.value.findIndex(listaUsuarios => listaUsuarios.id === id);
    try{
      const baja = await deleteUsuarios(listaUsuarios.value[index].id);
      if (baja?.status === 200) {
        listaUsuarios.value[index].estado = '0';
            activateSnack("Usuario dado de baja con éxito", "success");
        } else {
            const errorMsg = baja?.data?.msg || "Error de conexión";
            activateSnack(errorMsg, "error");
        }
    }catch(error){
        console.error(error);
        activateSnack("Error en el usuario", "error");
    }
  }

const save = async() => {

    formModel.value.nombre = (formModel.value.nombre || '').toUpperCase().trim();

    if (isEditing.value) {
      const index = listaUsuarios.value.findIndex(u => u.id === formModel.value.id)
      listaUsuarios.value[index] = { ...formModel.value }

      try {
        const actualizacion = await putUsuarios(formModel.value, formModel.value.id);

        if (actualizacion?.status === 200) {
            activateSnack("Usuario actualizado con éxito", "success");
            dialog.value = false;
        } else {
            const errorMsg = actualizacion?.data?.msg || "Error de conexión";
            activateSnack(errorMsg, "error");
        }
      } catch(error) {
          console.error(error);
          activateSnack("Error en el usuario", "error");
      }
      
    } else {
      try {
        const registro = await postUsuarios(formModel.value);

        if (registro?.status === 200 || registro?.status === 201) {
            activateSnack("Usuario registrado con éxito", "success");
            
            listaUsuarios.value.unshift({
              ...formModel.value,
              id: registro?.data?.id || registro?.data?.usuario?.id || 'N/A',
              estado: '1',
              rol: formModel.value.rol || 'USER'
            });

            dialog.value = false; 
        } else {
            const errorMsg = registro?.data?.msg || "Error de conexión";
            activateSnack(errorMsg, "error");
        }
      } catch (error) {
          console.error(error);
          activateSnack("Error en el servidor", "error");
      }
    }
  }




  //function remove (id) {
    //const index = books.value.findIndex(book => book.id === id)
    //books.value.splice(index, 1)
  //}


  const reset = async () => {
    dialog.value = false;
    formModel.value = createNewRecord();
    try {
       const respuesta = await getUsuarios();
  
       if (respuesta.status === 200) {
           listaUsuarios.value = respuesta.data.map(u => ({
               ...u,
               nombre: (u.nombre || '').toUpperCase().trim()
           }));
       } else {
           console.error("Error al cargar usuarios", respuesta);
       }
   } catch (error) {
       console.error(error);
   }
  }

  const activateSnack = (mensaje, color = "primary") => {
    mensajeSnack.value = mensaje;
    colorSnack.value = color;
    mostrarSnack.value = true;
};

const salir = () => {
  setTimeout(() => {
      router.push("/"); 
  }, 1000);
  localStorage.clear();
  activateSnack("Hasta luego", "success");
}

</script>