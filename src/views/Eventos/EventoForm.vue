<template>
  <div>
    <div class="conteudo">
      <form class="panel panel-default">
        <div class="panel-heading">{{scope}} Evento</div>
        <Rotulo nome="CRON">
          <div>
            <input type="checkbox" id="seg"> 
            <label for="seg">Seg. </label> |

            <input type="checkbox" id="ter">
            <label for="ter">Ter. </label> |

            <input type="checkbox" id="qua">
            <label for="qua">Qua. </label> |

            <input type="checkbox" id="qui">
            <label for="qui">Qui. </label> |
            
            <input type="checkbox" id="sex">
            <label for="sex">Sex. </label> |

            <input type="checkbox" id="sab">
            <label for="sab">Sab. </label> |

            <input type="checkbox" id="dom">
            <label for="Dom">Dom. </label>
            <hr>
            <input class="form-control" size="1" type="text" v-model="evento.cron" placeholder="CRON PERSONALIZADO EX.: * */1 * 1/1 * *" />
          </div>
        </Rotulo>
        <Rotulo nome="Hora Evento">
          <input type="datetime-local" class="form-control" v-model="evento.hora"/>
        </Rotulo>
        <Rotulo nome="Fim do Eventos">
          <input type="datetime-local" class="form-control" v-model="evento.fimCron" />
        </Rotulo>
        <div class="indentificacao">
          <Rotulo nome="Localização">
            <select v-model="idLocal" class="form-control">
              <option
                v-for="locais in arrayLocais"
                :value="locais.idLocal"
                :key="locais.idLocal"
              >{{locais.localizacao}}</option>
            </select>
            <select v-model="evento.idEquipamento" class="form-control">
              <option
                v-for="equipamento in arrayEquipamentos.filter((value) => {return value.idLocal == this.idLocal})"
                :value="equipamento.id"
                :key="equipamento.id"
              >{{equipamento.nome}}</option>
            </select>
          </Rotulo>
        </div>
        <Rotulo nome="Ação">
          <select v-model="evento.status" class="form-control">
            <option
              v-for="status in tiposStatus"
              :value="status.codigo"
              :selected="status.codigo === 1"
              :key="status.codigo"
            >{{status.nome}}</option>
          </select>
        </Rotulo>
        <hr />
        <router-link tag="button" class="btn btn-secondary" to="/eventos">Voltar</router-link>
        <button @click="funcButton" type="button" class="btn btn-success">{{scope}}</button>
      </form>
    </div>
  </div>
</template>
<script>
import Rotulo from "./../../components/Rotulo";
export default {
  components: { Rotulo },
  props: {
    scope: String,
    evento: Object,
    funcButton: Function
  },
  data() {
    return {
      idLocal: 0,
      tiposStatus: [
        { codigo: 0, nome: "DESLIGAR" },
        { codigo: 1, nome: "LIGAR" },
        { codigo: -1, nome: "DEFEITUOSO"}
      ],
      arrayLocais: [],
      arrayEquipamentos: []
    };
  },
  methods: {
    getLocais() {
      this.$http.get("locais").then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.arrayLocais.push({
            idLocal: res.data[i].idLocal,
            localizacao: res.data[i].localizacao
          });
        }
        this.getEquipamentos();
      });
    },
    getEquipamentos() {
      this.$http.get("equipamentos").then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.arrayEquipamentos.push({
            id: res.data[i].idEquipamento,
            idLocal: res.data[i].idLocal,
            categoria: res.data[i].idCategoria,
            nome: res.data[i].nome,
            descricao: res.data[i].descricao,
            status: res.data[i].status
          });
        }
        if(this.evento.idEquipamento != null && this.evento.idEquipamento > 0){
            this.idLocal = this.arrayEquipamentos.filter((value) => {return value.id== this.evento.idEquipamento})[0].idLocal
        }
      });
    }
  },
  mounted() {
    this.getLocais();
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
/*
body {
	background-color: #ECECEC;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	display: flex;
	flex-direction: column;
}

.painel .cabecalho {
	width: 100%;
	background-color: #DDD;
	padding: 10px 0px;
	border-radius: 5px;
	font-size: 1.4rem;
}

#app form button {
	float: right;
	margin: 10px 0px;
	padding: 10px 20px;
	font-size: 1.4rem;
	border-radius: 5px;
	color: #FFF;
	background-color: #2196F3;
}

#app h1 {
	font-weight: 200;
	margin: 20px;
	padding: 0;
}

.mr-4 {
	margin-right: 40px;
}*/
</style>