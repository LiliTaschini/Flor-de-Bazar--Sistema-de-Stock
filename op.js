const app = Vue.createApp({

    data() {
      return {
        page: "productos",
        pagePorcentaje: 'aumento',
        producto: '', 
        código: '', 
        categoria: '',   
        descripcion: '',  
        cantidad: '',  
        precio: '',  
        descuento: '', 
        aumento: '', 
        nuevaCategoria: '', 
      }
    }
  }).mount('#app')