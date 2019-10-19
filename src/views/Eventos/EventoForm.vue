<template>
  <div id="app">
    <div class="conteudo">
      <form class="panel panel-default form-inline">
        <div class="panel-heading">{{scope}} Evento</div>
        <div nome="CRON">
          <label class="control-label">Dias da Semana:</label>
          <div class="form-group" nome="Dias Evento">
            <input v-model="diasEvento[0]" type="checkbox" id="dom" />
            <label for="Dom">Dom.</label>
            |
            <input v-model="diasEvento[1]" type="checkbox" id="seg" />
            <label for="seg">Seg.</label>
            |
            <input v-model="diasEvento[2]" type="checkbox" id="ter" />
            <label for="ter">Ter.</label>
            |
            <input v-model="diasEvento[3]" type="checkbox" id="qua" />
            <label for="qua">Qua.</label>
            |
            <input v-model="diasEvento[4]" type="checkbox" id="qui" />
            <label for="qui">Qui.</label>
            |
            <input v-model="diasEvento[5]" type="checkbox" id="sex" />
            <label for="sex">Sex.</label>
            |
            <input v-model="diasEvento[6]" type="checkbox" id="sab" />
            <label for="sab">Sab.</label>
            <!-- <hr>
            <input class="form-control" size="1" type="text" v-model="evento.cron" placeholder="CRON PERSONALIZADO EX.: * */1 * 1/1 * *" />-->
          </div>
          <Rotulo nome="Hora Evento">
            <input type="time" class="form-control" v-model="horaEvento" />
          </Rotulo>
        </div>
        <Rotulo nome="Fim do Eventos">
          <input type="datetime-local" class="form-control" v-model="evento.fimCron" />
        </Rotulo>
        <hr />
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
        <button
          @click.prevent="montarCron"
          @click="funcButton"
          type="button"
          class="btn btn-success"
        >{{scope}}</button>
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
        { codigo: -1, nome: "DEFEITUOSO" }
      ],
      arrayLocais: [],
      arrayEquipamentos: [],
      diasEvento: [false, false, false, false, false, false, false], //Dom. à Sab.
      horaEvento: "00:00"
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
        //Popular equipamentos depende do sucesso dos locais terem sido populados
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
        if (this.evento.idEquipamento != null && this.evento.idEquipamento > 0) {
          this.idLocal = this.arrayEquipamentos.filter(value => {
            return value.id == this.evento.idEquipamento;
          })[0].idLocal;

          if(this.evento.idEvento != null && this.evento.idEvento > 0){
            this.horaEvento = this.evento.hora.split("T")[1];
            var vetorDias = this.evento.cron.split(" ")[5].split(",");
            for(var j = 0; j < this.diasEvento.length; j++){
              this.diasEvento[j] = vetorDias.filter(value => {return value == j})[0] ? true : false
            }
          }

          this.montarCron();
        }
      });
    },
    montarCron() {
      var dias = "";
      for (var i = 0; i < this.diasEvento.length; i++) {
        if (this.diasEvento[i]) {
          if (dias.length > 0) {
            dias += "," + i;
          } else {
            dias += i;
          }
        }
      }
      var dataProxEvento = new Date();
      var vetorDias = dias.split(",");

      //Mesmo dia? e hora maior q a atual? Show! Faz nada!
      var praHoje =
        vetorDias.filter(value => {
          return (
            dataProxEvento.getDay() == value && this.horaEvento > new Date().getHours() + ":" + new Date().getMinutes()
          );
        }).length > 0 ? true : false;

      if (praHoje === false) {
        var diasMaiores = vetorDias.filter(value => {return dataProxEvento.getDay() < value})[0]
        var diasMenores = vetorDias.filter(value => {return dataProxEvento.getDay() >= value})[0];
        //Há dias maiores q o atual? Pego o primeiro dia maior que o dia atual (atraves de um filter), calculo a diferença e adiciono os dias a data atual.. show!
        if(diasMaiores != undefined){
          dataProxEvento.setDate(dataProxEvento.getDate() + (dataProxEvento.getDay() - diasMaiores));
        }

        //Os dias são menores q o atual? Filtro os valores q são menores ou iguais e pego o primeiro valor do array, calculo a diferença e adiciono os dias a data atual!
        if(diasMenores != undefined){
          dataProxEvento.setDate(dataProxEvento.getDate() + (diasMenores - dataProxEvento.getDay()));
        }
      }

      this.evento.hora = (dataProxEvento.toISOString()).split("T")[0] + "T" + this.horaEvento;
      this.evento.cron =
        "0 " + // Segundos (0 - 59).
        this.horaEvento.split(":")[1] + // Minutos (0 - 59).
        " " + 
        this.horaEvento.split(":")[0] + // Horas (0 - 23).
        " * " + // Dia (1 - 31).
        "* " + // Mês (1 - 12).
        dias; // Dia da semana (0 - 6)
    }
  },
  mounted() {
    this.getLocais();
  }
};
</script>
<style>
</style>