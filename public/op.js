const app = Vue.createApp({
  data() {
    return {
      /* páginas */
      page: "inicio",
      pagePorcentaje: "aumento",
      pageInicio: "iniciar",
      /* ingresar producto */
      db: null,
      productos: [],
      nombreProducto: "",
      codigo: "",
      categoria: "",
      descripcion: "",
      cantidad: "",
      precio: "",
      /* porcentajes */
      descuento: "",
      aumento: "",
      nuevaCategoria: "",
      /* login */
      usuario: null,
      contraseña: "",
      inicioSesion: false,
    };
  },
  created() {
    let bd = firebase.firestore();
    this.db = bd;
    /* this.getProductos(); */
  },
  methods: {
    iniciarSesion() {
      if (this.usuario != "" && this.contraseña != "") {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.usuario, this.contraseña)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            this.usuario = user;
            this.contraseña = "";
            this.page = "productos";
            this.inicioSesion = true;
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "Inicio Correcto",
            });
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title:
            "Por favor, ingrese con las credenciales correctas para iniciar el sistema",
        });
      }
    },
    addProductos() {
      let producto = {
        producto: this.nombreProducto,
        codigo: this.codigo,
        cantidad: this.cantidad,
        descripcion: this.descripcion,
        precio: this.precio,
        categoria: this.categoria,
      };
      this.db
        .collection("productos")
        .add(producto)
        .then((docRef) => {
          this.getProductos();
          this.page = "productos";
          this.nombreProducto = "";
          this.codigo = "";
          this.cantidad = "";
          this.descripcion = "";
          this.precio = "";
        })
        .catch((err) => console.log(err));
    },
    /* getProductos() {
      this.db
        .collection("productos")
        .get()
        .then((query) => {
          this.productos = [];
          query.foreach(doc =>{
            let aux = {
              id: doc.id,
              data: doc.data(),
            };
            this.productos.push(aux);
          });
        });
    }, */
  },
}).mount("#app");
