<template>
    <div>
        <div style="width : 99%">
          <v-client-table :data="table1.data" :columns="table1.columns" :options="table1.options">
            <a slot="acao" slot-scope="props" target="_blank" :href="props.row.acao">
              <a title="Detalhes" class="acao glyphicon glyphicon-eye-open"></a>
              <a title="Editar" class="acao glyphicon glyphicon-edit"></a>  
              <a title="Excluir" class="acao glyphicon glyphicon-trash" @click="deleteCategoria(props.row.idCategoria)"></a>
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
  //"idCategoria",
  "nome",
  "acao"
];

export default {
  data() {
    return {
      table1: {
        // title: "Categorias",
        // subTitle: "Lista de eventos",
        columns: [...tableColumns],
        data: [],
        options: {
          headings: {
            idCategoria:"ID",
            nome: "Categoria",
            acao:""
          },
          sortable: ["status"],
          filterable: ["status"]
        }
      },
      arrayCaterorias: []
    };
  },
  methods:{
    deleteCategoria(id){
      if(confirm("Deletar?")){
        this.$http.delete("equipamentos/categorias/" + id).then( res => {
          if(res.status == 200){
            location.reload(); 
          }
        })
      }
    },
    getCategorias(){
        this.$http.get("equipamentos/categorias").then(res => {
            for (var i = 0; i < res.data.length; i++) {
                this.table1.data.push({
                    idCategoria: res.data[i].idCategoria,
                    nome: res.data[i].nome
                });
            }
        });
    },
    irParaCadastro(){
      this.$router.push('categorias/cadastro')
    }
  },
  mounted() {
    this.getCategorias();
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
