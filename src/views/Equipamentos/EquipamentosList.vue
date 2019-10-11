<template>
    <div>
        <div style="width : 99%">
          <v-client-table :data="table1.data" :columns="table1.columns" :options="table1.options">
            <a slot="acao" slot-scope="props" target="_blank" :href="props.row.acao">
              <a title="Detalhes" class="acao glyphicon glyphicon-eye-open"></a>
              <a title="Editar" class="acao glyphicon glyphicon-edit"></a>  
              <a title="Excluir" class="acao glyphicon glyphicon-trash" 
                  @click="deleteEquipamento(props.row.id)"></a>
            </a>
          </v-client-table>
        </div>
        <button class="btn btn-primary adicionar" variant="success" @click="irParaCadastro">
            <span class="glyphicon glyphicon-plus"></span>
        </button>
        <button type="button" class="btn btn-danger" @click="getEquipamentos">
            <span class="glyphicon glyphicon-refresh"></span>
        </button>
        <router-view/>
    </div>
</template>
<script>
//import { PaperTable } from "@/components";
const tableColumns = [
  //"id",
  "local",
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
            local: "LOCAL",
            categoria: "CATEGORIA",
            nome: "NOME",
            descricao: "DESCRICAO",
            status: "STATUS",
            acao: ""
          },
          sortable: ["nome", "local", "status", "descricao"],
          filterable: ["nome", "descricao"]
        }
      },
      arrayEquipamentos: [],
      arrayLocais: [],
      arrayCategorias: []
    };
  },
  methods: {
    deleteEquipamento(id){
      if(confirm("Apagar msm?!")){
        this.$http.delete("equipamentos/" + id).then( res => {
          if(res.status == 200){
            location.reload(); 
          }
        })
      }
    },
    getEquipamentos() {
      
      this.$http.get("equipamentos").then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.arrayEquipamentos.push({
            id: res.data[i].idEquipamento,
            local: this.arrayLocais == undefined ? this.arrayLocais.filter((value) => {return res.data[i].idLocal == value.idLocal})[0].localizacao : "Sem local",
            categoria: this.arrayCategorias == undefined ? this.arrayCategorias.filter((value) => {return res.data[i].idCategoria == value.idCategoria})[0].nome : "Sem Categoria",
            nome: res.data[i].nome,
            descricao: res.data[i].descricao,
            status: this.getStatus(res.data[i].status)
          });
        }
        this.table1.data = this.arrayEquipamentos;
      });
    },
    getLocais(){
        this.$http.get("locais").then(res => {
            for (var i = 0; i < res.data.length; i++) {
                this.arrayLocais.push({
                    idLocal: res.data[i].idLocal,
                    localizacao: res.data[i].localizacao
                });
            }
        });
    },
    getCategorias(){
        this.$http.get("equipamentos/categorias").then(res => {
            for (var i = 0; i < res.data.length; i++) {
                this.arrayCategorias.push({
                    idCategoria: res.data[i].idCategoria,
                    nome: res.data[i].nome
                });
            }
        });
    },
    getStatus(status){
      if(status === 1){
        return "LIGADO"
      } else if(status === 0){
        return "DESLIGADO"
      } else {
        return "DEFEITUOSO"
      }
    },
    irParaCadastro(){
      this.$router.push('equipamentos/cadastro')
    }
  },
  mounted() {
    this.getCategorias();
    this.getLocais();
    this.getEquipamentos();
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
