<template>
  <div class="conteudo">
    <form class="panel panel-default">
      <div class="panel-heading">{{escopo}} Equipamento</div>
      <Rotulo nome="Nome*">
        <input type="text" v-model="equipamento.nome" placeholder="Nome do Equipamento" />
      </Rotulo>
      <Rotulo nome="Descrição">
        <input type="text" v-model="equipamento.descricao" placeholder="Descrição " />
      </Rotulo>
      <Rotulo nome="Marca/Modelo">
        <input type="text" v-model="equipamento.marca" placeholder="Marca" />
        <input type="text" v-model="equipamento.modelo" placeholder="Modelo" />
      </Rotulo>
      <Rotulo nome="Tombamento">
        <input type="text" v-model="equipamento.tombamento" placeholder="Tombamento" />
      </Rotulo>
      <Rotulo nome="Potência">
        <input
          type="number"
          v-model="equipamento.potencia"
          value="100"
          placeholder="Potencia em Watts"
        />
      </Rotulo>
      <Rotulo nome="Local*">
        <select v-model="equipamento.idLocal">
          <option
            v-for="locais in arrayLocais"
            :value="locais.idLocal"
            :key="locais.idLocal"
          >{{locais.localizacao}}</option>
        </select>
      </Rotulo>
      <Rotulo nome="Categoria*">
        <select v-model="equipamento.idCategoria">
          <option
            v-for="categoria in arrayCaterorias"
            :value="categoria.idCategoria"
            :key="categoria.idCategoria"
          >{{categoria.nome}}</option>
        </select>
      </Rotulo>
      <router-link tag="button" class="btn btn-secondary" to="/equipamentos">Voltar</router-link>
      <button type="button" @click="funcButton" class="btn btn-success" value="Cadastrar">{{escopo}}</button>
    </form>
  </div>
</template>
<script>
import Rotulo from "./../../components/Rotulo";

export default {
  components: { Rotulo },
  props: {
    escopo: String,
    equipamento: Object,
    funcButton: Function
  },
  data() {
    return {
      arrayLocais: [],
      arrayCaterorias: []
    };
  },
  methods: {
    /*checkForm(e){
            if(this.equipamento.nome && this.equipamento.idlocal && this.equipamento.idCategoria){
                return true;
            } else {
                console.log('preencha!')
                return false;
            }
            e.preventDefault();
        },*/
    getLocais() {
      this.$http.get("locais").then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.arrayLocais.push({
            idLocal: res.data[i].idLocal,
            localizacao: res.data[i].localizacao
          });
        }
      });
    },
    getCategorias() {
      this.$http.get("equipamentos/categorias").then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.arrayCaterorias.push({
            idCategoria: res.data[i].idCategoria,
            nome: res.data[i].nome
          });
        }
      });
    }
  },
  mounted() {
    this.getLocais();
    this.getCategorias();
  }
};
</script>
<style>
/*
.conteudo {
    display: flex;
    justify-content: space-around;
}

.identificacao{
    flex-direction: row;
}
.panel {
	flex: 1;
	background: #FFF;
	margin: 0px 10px;
	padding: 20px;
	border: 1px solid #AAA;
	border-radius: 5px;
}
*/
</style>