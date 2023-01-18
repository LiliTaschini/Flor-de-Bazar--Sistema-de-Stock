const app = Vue.createApp({

    data() {
      return {
        page: "inicio",
        pagePorcentaje: 'aumento',
        pageInicio: 'iniciar',
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