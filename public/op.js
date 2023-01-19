const app = Vue.createApp({

    data() {
      return {
        /* páginas */
        page: "productos",
        pagePorcentaje: 'aumento',
        pageInicio: 'iniciar',
        /*  */
        producto: '', 
        código: '', 
        categoria: '',   
        descripcion: '',  
        cantidad: '',  
        precio: '',  
        descuento: '', 
        aumento: '', 
        nuevaCategoria: '',
        /* login */
        usuario: null, 
        contraseña: '',
        inicioSesion: true,  
      }
    },
    methods:{
      iniciarSesion(){
        if(this.usuario!='' && this.contraseña!=''){
          firebase.auth().signInWithEmailAndPassword(this.usuario, this.contraseña)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            this.usuario = user;
            this.contraseña = '';
            this.page = 'productos'
            this.inicioSesion = true;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'success',
              title: 'Inicio Correcto'
            })
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });  
      }else{
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: 'Por favor, ingrese con las credenciales correctas para iniciar el sistema'
        })
      }
    }
  }}).mount('#app')