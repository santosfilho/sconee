<template>
  <div>
    <EventoForm v-if="evento.idEvento != null" scope="Editar" :evento="evento" :funcButton="putEvento" />
  </div>
</template>
<script>
import EventoForm from "./EventoForm";

export default {
  components: { EventoForm },
  props: ["id"],
  data() {
    return {
      evento: {}
    };
  },
  methods: {
    putEvento() {
      this.$http.put("eventos", {
          idEvento: this.evento.idEvento,
          cron: this.evento.cron,
          fimCron: this.evento.fimCron,
          idEquipamento: this.evento.idEquipamento,
          status: this.evento.status
        })
        .then(resp => {
          if (resp.data.idEvento != null) {
            alert("Atualizado com sucesso!");
          }
          this.$router.push("/eventos");
        });
    },
    getEvento() {
      this.$http.get("eventos/" + this.id).then(res => {
        this.evento = res.data;
        if (this.evento.fimCron != null) {
          this.evento.fimCron = this.getDataTime(this.evento.fimCron);
        }
        if (this.evento.hora != null) {
          this.evento.hora = this.getDataTime(this.evento.hora);
        }
      });
    },
    getDataTime(datatime) {
      //Devolve o timestamp sem os milisegundos e Fuso
      return datatime.split(".")[0];
    }
  },
  mounted() {
    this.getEvento();
  }
};
</script>