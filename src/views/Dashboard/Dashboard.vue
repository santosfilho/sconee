<template>
  <div>
    <div class="dash">
      <div
        style="width: 18rem;"
        v-for="equipamento in arrayEquipamentos"
        :key="equipamento.id"
        :class="['card', equipamento.classeStatus]"
        @click="mudarStatus(equipamento)"
      >
        <h4 class="card-title text-center">{{equipamento.nome}}</h4>
        <div class="card-body">
          <h5 class="card-subtitle mb-2 text">{{equipamento.localizacao}}</h5>
          <h6 class="card-subtitle mb-2 text">{{equipamento.descricao}}e</h6>
        </div>
        
      </div>
    </div>
    <hr />
    <button type="button" class="btn btn-danger" @click="getEquipamentos">
      <span class="glyphicon glyphicon-refresh"></span>
    </button>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      arrayEquipamentos: [],
      arrayLocais: []
    };
  },
  methods: {
    getEquipamentos() {
      var arrayTemp = [];
      this.$http.get("equipamentos").then(res => {
        for (var i = 0; i < res.data.length; i++) {
          arrayTemp.push({
            id: res.data[i].idEquipamento,
            localizacao: res.data[i].localizacao,
            nome: res.data[i].nome,
            descricao: res.data[i].descricao,
            status: res.data[i].status,
            classeStatus: {
              ligado: res.data[i].status == 1 ? true : false,
              desligado: res.data[i].status == 0 ? true : false
            }
          });
        }
        this.arrayEquipamentos = arrayTemp;
      });
    },
    mudarStatus(equipamento) {
      var params =
        "idEquipamento=" +
        equipamento.id +
        "&status=" +
        (equipamento.status == 0 ? 1 : 0);
      var index = this.arrayEquipamentos.indexOf(equipamento);
      this.$http.put("equipamentos/mudar-status?" + params).then(res => {
        this.arrayEquipamentos[index].status = equipamento.status == 0 ? 1 : 0;
        this.arrayEquipamentos[index].classeStatus = {
          ligado: this.arrayEquipamentos[index].status == 1 ? true : false,
          desligado: this.arrayEquipamentos[index].status == 0 ? true : false
        };
      });
    },
    zerar() {
      this.arrayEquipamentos = [];
    }
  },
  watch: {
    arrayEquipamentos() {
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
.dash {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  margin: 1px;
  padding: 5px;
  box-shadow: 0 0px 5px grey;
  /* background-color: lightpink; */
  cursor: pointer;
}

.ligado {
  background-color: lightgreen;
}

.desligado {
  background-color: lightpink;
}

.buttoes {
  display: flex;
  justify-content: space-around;
}
.adicionar {
  cursor: pointer;
}
</style>
