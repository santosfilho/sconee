<template>
  <div>
    <div style="width : 99%">
      <v-client-table :data="table1.data" :columns="table1.columns" :options="table1.options">
        <div slot="status" slot-scope="props" class="centro">
          <label v-if="props.row.status != -1" class="switch">
            <input type="checkbox" v-model="props.row.status" />
            <span class="slider round" @click="mudarStatus(props.row.id, props.row.status)"></span>
          </label>
          <span v-else>
            {{getStatus(props.row.status)}}
            <a @click="mudarStatus(props.row.id, props.row.status)">(FORÇAR LIGAR)</a>
          </span>
        </div>
        <a slot="acao" slot-scope="props" target="_blank" :href="props.row.acao">
          <a title="Detalhes" class="acao glyphicon glyphicon-eye-open"></a>
          <a title="Editar" class="acao glyphicon glyphicon-edit"></a>
          <a
            title="Excluir"
            class="acao glyphicon glyphicon-trash"
            @click="deleteEquipamento(props.row.id)"
          ></a>
        </a>
      </v-client-table>
    </div>
    <button class="btn btn-primary adicionar" variant="success" @click="irParaCadastro">
      <span class="glyphicon glyphicon-plus"></span>
    </button>
    <button type="button" class="btn btn-danger" @click="getEquipamentos">
      <span class="glyphicon glyphicon-refresh"></span>
    </button>
    <router-view />
  </div>
</template>
<script>
const tableColumns = [
  //"id",
  "localizacao",
  "categoria",
  "nome",
  //"descricao",
  // "Marca",
  // "Tombamento",
  // "Modelo",
  "status",
  "acao"
  // "Potencia",
  // "Data Cadastro"
];

export default {
  //   components: {
  //     PaperTable
  data() {
    return {
      table1: {
        columns: [...tableColumns],
        data: [],
        options: {
          headings: {
            //id: "ID",
            localizacao: "LOCAL",
            categoria: "CATEGORIA",
            nome: "NOME",
            descricao: "DESCRICAO",
            status: "STATUS",
            acao: ""
          },
          sortable: ["nome", "local", "status", "descricao"],
          filterable: ["nome", "descricao"]
        }
      } 
    };
  },
  methods: {
    deleteEquipamento(id) {
      if (confirm("Apagar msm?!")) {
        this.$http.delete("equipamentos/" + id).then(res => {
          if (res.status == 200) {
            location.reload();
          }
        });
      }
    },
    getEquipamentos() {
      var arrayTemp = [];
      this.$http.get("equipamentos").then(res => {
        for (var i = 0; i < res.data.length; i++) {
          arrayTemp.push({
            id: res.data[i].idEquipamento,
            localizacao: res.data[i].localizacao,
            categoria: res.data[i].categoria,
            nome: res.data[i].nome,
            descricao: res.data[i].descricao,
            status: res.data[i].status
          });
        }
        this.table1.data = arrayTemp;
      });
    },
    mudarStatus(id, status) {
      var params = "idEquipamento=" + id + "&status=" + (status == 0 ? 1 : 0);
      var index = this.table1.data.indexOf(this.table1.data.filter((v) => {return v.id == id})[0]);
      this.$http.put("equipamentos/mudar-status?" + params).then(res => {
        this.table1.data[index].status = status == 0 ? 1 : 0;
      });
    },
    getStatus(status) {
      if (status === 1) {
        return "LIGADO";
      } else if (status === 0) {
        return "DESLIGADO";
      } else {
        return "DEFEITUOSO";
      }
    },
    irParaCadastro() {
      this.$router.push("equipamentos/cadastro");
    }
  },
  watch: {
    'table1.data'() {
      setTimeout(() => {
        this.getEquipamentos();
      }, 5000);
    }
  },
  mounted() {
    this.getEquipamentos();
  }
};
</script>
<style>
</style>
