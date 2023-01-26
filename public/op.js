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
      productosFiltrados: [],
      categoriasFiltradas: [],
      comprobacion: true,
      nombreProducto: "",
      codigo: "",
      categoria: "",
      categorias: [],
      descripcion: "",
      cantidad: "",
      precio: "",
      buscar: "",
      cat: "",
      /* porcentajes */
      descuento: "",
      aumento: "",
      nuevaCategoria: "",
      /* login */
      usuario: null,
      contraseña: "",
      inicioSesion: true,
    };
  },
  created() {
    let bd = firebase.firestore();
    this.db = bd;
    this.getProductos();
    this.getCategorias();
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
      this.comprobarCodigo();
      if (this.comprobacion === true) {
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
          .doc(`${this.codigo}`)
          .set(producto)
          .then((docRef) => {
            this.getProductos();
            this.page = "productos";
            this.nombreProducto = "";
            this.codigo = "";
            this.cantidad = "";
            this.descripcion = "";
            this.precio = "";
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
              title: "Producto agregado con éxito",
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.comprobacion = true;
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
          title: "El código ya existe",
        });
      }
    },
    addCategorias() {
      let categoria = {
        categoria: this.nuevaCategoria,
      };
      this.db
        .collection("categorias")
        .doc()
        .set(categoria)
        .then((docRef) => {
          this.getCategorias();
          this.page = "categorias";
          this.nuevaCategoria = "";
        })
        .catch((err) => console.log(err));
    },
    getProductos() {
      this.db
        .collection("productos")
        .get()
        .then((query) => {
          this.productos = [];
          query.forEach((doc) => {
            let aux = {
              id: doc.id,
              data: doc.data(),
            };
            this.productos.push(aux);
          });
          console.log(this.productos);
        });
    },
    getCategorias() {
      this.db
        .collection("categorias")
        .get()
        .then((query) => {
          this.categorias = [];
          query.forEach((doc) => {
            let aux = {
              data: doc.data(),
            };
            this.categorias.push(aux);
          });
          console.log(this.categorias);
        });
    },
    comprobarCodigo() {
      this.productos.forEach((doc) => {
        if (this.codigo == doc.id) {
          this.comprobacion = false;
        }
      });
    },
    borrarProducto(producto) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.page = "productos";
          this.db
            .collection("productos")
            .doc(producto.id)
            .delete()
            .then((res) => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            });
        }
      });
    },
  },
  computed: {
    buscarProductos() {
      this.productosFiltrados = this.productos.filter((res) => {
        return (
          res.data.producto.includes(this.buscar) &&
          (this.cat === res.data.categoria || this.cat === "Seleccionar")
        );
      });
    },
  },
}).mount("#app");
