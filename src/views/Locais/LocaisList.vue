<template>
    <div>
        <div style="width : 99%">
          <v-client-table ref="table" :data="table1.data" :columns="table1.columns" :options="table1.options">
            <a slot="acao" slot-scope="props" target="_blank" :href="props.row.acao">
              <a title="Detalhes" class="acao glyphicon glyphicon-eye-open"></a>
              <!-- Pendente de implementar PUT na API -->
              <router-link tag="a" title="Editar" class="acao glyphicon glyphicon-edit" :to="'/locais/' + props.row.id + '/editar'"/>
              <a title="Excluir" class="acao glyphicon glyphicon-trash" 
                  @click="deleteLocal(props.row.idLocal)"></a>
            </a>
          </v-client-table>
        </div>
        <button class="btn btn-primary"  variant="success" @click="irParaCadastro">
            <span class="glyphicon glyphicon-plus"></span>
          </button>
    </div>
</template>
<script>
//import { PaperTable } from "@/components";
const tableColumns = [
  //"idLocal",
  "localizacao",
  "setor",
  "capacidade",
  "descricao",
  "acao"
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
            idLocal: "ID",
            localizacao: "Localização",
            setor: "Setor",
            capacidade: "Capacidade",
            descricao: "Descrição",
            acao: "Ação"
          },
          sortable: ["nome", "local", "status", "descricao"],
          filterable: ["nome", "descricao"]
        }
      },
      arrayLocais: []
    };
  },
  methods: {
    getLocais(){
        this.$http.get("locais").then(res => {
            for (var i = 0; i < res.data.length; i++) {
                this.arrayLocais.push({
                    idLocal: res.data[i].idLocal,
                    localizacao: res.data[i].localizacao,
                    setor: res.data[i].setor,
                    capacidade: res.data[i].capacidade,
                    descricao: res.data[i].descricao
                });
            }
          this.table1.data = this.arrayLocais
        });
    },
    deleteLocal(id){
      if(confirm("Deseja Realmente apagar?!")){
        this.$http.delete("locais/" + id).then( res => {
          if(res.status == 200){
            location.reload(); 
          }
        })
      }
    },
    irParaCadastro(){
      this.$router.push('locais/cadastro')
    }
  },
  mounted() {
    this.getLocais();
  },
  onUpdate() {
    this.$refs.table.refresh();
  }
};
</script>
<style>
.acao{
  cursor: pointer;
  margin-left: 10px;
}
</style>
