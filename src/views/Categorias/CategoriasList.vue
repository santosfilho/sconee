<template>
    <div>
        <div style="width : 99%">
          <v-client-table :data="table1.data" :columns="table1.columns" :options="table1.options">
            <a slot="acao" slot-scope="props" target="_blank" :href="props.row.acao">
              <a title="Detalhes" class="acao glyphicon glyphicon-eye-open"></a>
              <a title="Editar" class="acao glyphicon glyphicon-edit"></a>  
              <a title="Excluir" class="acao glyphicon glyphicon-trash"></a>
            </a>
          </v-client-table>
        </div>
        <button class="btn btn-primary adicionar" @click="irParaCadastro">
          <span class="glyphicon glyphicon-plus"></span>
        </button>
    </div>
</template>
<script>
const tableColumns = [
  //"id",
  "nomeEquipamento",
  "localizacao",
  "status",
  "data_prox_evento",
  "cron",
  "fim_cron",
  "acao"
];

export default {
  data() {
    return {
      table1: {
        title: "Eventos",
        subTitle: "Lista de eventos",
        columns: [...tableColumns],
        data: [],
        options: {
          headings: {
            //id:"ID",
            nomeEquipamento: "Equipamento",
            localizacao: "Localizacao",
            status: "status",
            data_prox_evento: "Data do proximo evento",
            cron: "CRON",
            fim_cron:"Fim CRON",
            acao: ""
          },
          sortable: ["status"],
          filterable: ["status"]
        }
      },
      arrayEventos: []
    };
  },
  methods:{
    getDataHora(dataHora) {
      //Separando data da hora
      dataHora = dataHora.split("T");
      //convertendo de AAAA-MM-DD para DD-MM-AAAA 
      //Troca posições: this.splice(new, 0, this.splice(old, 1)[0])
      dataHora[0] = dataHora[0].split("-")
      dataHora[0].splice(2, 0, dataHora[0].splice(0, 1)[0])
      dataHora[0].splice(1, 0, dataHora[0].splice(0, 1)[0])
      dataHora[0] = dataHora[0].join("/")
      //Hora
      dataHora[1] = dataHora[1].split("-")[0].split(".")[0];

      return dataHora.join(" às ");
    },
    getStatus(status){
      if(status === 1){
        return "LIGADDO"
      } else if(status === 0){
        return "DESLIGADO"
      } else {
        return "DESLIGADO - COM DEFEITO"
      }
    },
    getEventos(){
      this.$http.get("eventos").then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.arrayEventos.push({
            //id: res.data[i].idEvento,
            nomeEquipamento: res.data[i].nomeEquipamento,
            localizacao: res.data[i].localizacao,
            status: this.getStatus(res.data[i].status),
            data_prox_evento: this.getDataHora(res.data[i].hora),
            cron: res.data[i].cron,
            fim_cron: res.data[i].fimCron == null ? "INDEFINIDO" : this.getDataHora(res.data[i].fimCron)
          });
        }
        this.table1.data = this.arrayEventos;
      });
    },
    irParaCadastro(){
      this.$router.push('eventos/cadastro')
    }
  },
  mounted() {
    this.getEventos();
  }
};
</script>
<style>
.acao{
  cursor: pointer;
  margin-left: 10px;
}
.adicionar{
  cursor: pointer;
}
</style>
