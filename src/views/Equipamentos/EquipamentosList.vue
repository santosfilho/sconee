<template>
    <div>
        <button @click="getEquipamentos">Adicionar Equipamento</button>
        <v-client-table :data="table1.data" :columns="table1.columns" :options="table1.options">
            <!-- <a slot="acao" slot-scope="props" target="_blank" :href="props.row.acao">
                <a title="Detalhes" class="ti-eye acao"></a>
                <a title="Editar" class="ti-pencil acao"></a>
                <a title="Excluir" class="ti-trash acao"></a>
            </a> -->
        </v-client-table>
    </div>
</template>
<script>
//import { PaperTable } from "@/components";
const tableColumns = [
  //"id",
  "local",
  "categoria",
  "nome",
  "descricao",
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
        //title: "Equipamentos",
        //subTitle: "Lista de Equipamentos",
        columns: [...tableColumns],
        data: [],
        options: {
          headings: {
            //id: "ID",
            local: "LOCAL",
            categoria: "CATEGORIA",
            nome: "NOME",
            descricao: "DESCRICAO",
            status: "STATUS",
            acao: "AÇÃO"
          },
          sortable: ["nome", "local", "status", "descricao"],
          filterable: ["nome", "descricao"]
        }
      },
      arrayEquipamentos: []
    };
  },
  methods: {
    getEquipamentos() {
      this.$http.get("equipamentos").then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.arrayEquipamentos.push({
            //id: res.data[i].idEquipamento,
            local: res.data[i].idLocal,
            categoria: res.data[i].idCategoria,
            nome: res.data[i].nome,
            descricao: res.data[i].descricao,
            status: res.data[i].status
          });
        }
        this.table1.data = this.arrayEquipamentos;
      });
    }
  },
  mounted() {
    this.getEquipamentos();
  }
};
</script>
<style>
.acao{
  cursor: pointer;
  margin-left: 10px;
}
</style>
