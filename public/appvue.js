// appvue.js
const appVue = Vue.createApp({
    data() {
      return {
        nombrecliente: "",
        cantidaddescuento: 0,
        nombreproducto: "",
        costoproducto: 0,
        cantidadqueadquiriste: 0,
      }
    },
    computed: {
      total() {
        return this.costoproducto * this.cantidadqueadquiriste;
      },
      descuento() {
        return this.total - this.total * 0.3;
      }
    },
    methods: {
      async mostrartotal() {
        try {
          const response = await fetch('http://localhost:3000/guardar-datos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nombrecliente: this.nombrecliente,
              cantidaddescuento: this.cantidaddescuento,
              nombreproducto: this.nombreproducto,
              costoproducto: this.costoproducto,
              cantidadqueadquiriste: this.cantidadqueadquiriste,
              total: this.cantidadqueadquiriste >= this.cantidaddescuento ? this.descuento : this.total,
            }),
          });
  
          const data = await response.json();
          console.log(data);
  
          // Mostrar alerta con el total
          if (this.cantidadqueadquiriste >= this.cantidaddescuento) {
            alert(`${this.nombrecliente}, tu producto comprado es: ${this.nombreproducto} y tu monto a pagar total es: ${this.descuento}$`);
          } else {
            alert(`${this.nombrecliente}, tu producto comprado es: ${this.nombreproducto} y tu monto a pagar total es: ${this.total}$`);
          }
        } catch (error) {
          console.error('Error al enviar datos:', error);
        }
      },
    },
  }).mount("#app");
  