<template>
    <div>
      <div class="dash">
        <div class="card" style="width: 18rem;"  v-for="equipamento in arrayEquipamentos" :key="equipamento.id">
          <h4 class="card-title text-center">{{equipamento.nome}}</h4>
          <div class="card-body">
            <h5 class="card-subtitle mb-2 text">{{equipamento.local}}</h5>
            <h6 class="card-subtitle mb-2 text">{{equipamento.descricao}}e</h6>
          </div>
          <!-- <label class="switch">
            <input type="checkbox" v-model="equipamento.status">
            <span class="slider round"></span>
          </label> -->
        </div>
      </div>
      <hr>
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
      this.arrayEquipamentos = [];
      this.$http.get("equipamentos").then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.arrayEquipamentos.push({
            id: res.data[i].idEquipamento,
            local: this.arrayLocais == undefined ? this.arrayLocais.filter((value) => {return res.data[i].idLocal == value.idLocal})[0].localizacao : "Sem local",
            nome: res.data[i].nome,
            descricao: res.data[i].descricao,
            status: res.data[i].status
          });
        }
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
    zerar(){
      this.arrayEquipamentos = []
    }
  },
  mounted() {
    this.getLocais();
    this.getEquipamentos();
  }
};
</script>
<style>
.dash{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card{
  margin: 1px;
  padding: 5px;
  box-shadow: 0 0px 5px grey;
  /* background-color: lightpink; */
  background-color: lightgreen;
  cursor: pointer;
}

.buttoes{
  display: flex;
  justify-content: space-around;
}
.adicionar{
  cursor: pointer;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 14px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 11px;
  width: 11px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(15px);
  -ms-transform: translateX(15px);
  transform: translateX(15px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
