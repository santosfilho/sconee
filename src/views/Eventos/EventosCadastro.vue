<template>
    <div>
        <h3>Cadastro Eventos</h3>
        <div class="conteudo">
            <form class="painel">
                <Rotulo nome="CRON">
                    <input type="text" v-model="evento.cron">
                </Rotulo>
                <Rotulo nome="Fim do CRON">
                    <input type="datetime" v-model="evento.fimCron">
                </Rotulo>
                <Rotulo nome="Hora Evento">
                    <input type="datetime" v-model="evento.hora">
                </Rotulo>
                <Rotulo nome="Status">
                    <select v-model="evento.status">
                        <option v-for="status in tiposStatus"
                            :value="status.codigo"
                            :selected="status.codigo === 1"
                            :key="status.codigo">{{status.nome}}</option>
                    </select>
                </Rotulo>
                <Rotulo nome="Locais">
                    <select v-model="idLocal">
                        <option v-for="locais in arrayLocais"
                            :value="locais.idLocal"
                            :key="locais.idLocal">{{locais.localizacao}}</option>
                    </select>
                </Rotulo>
                <!--tiposStatus.filter((value) => {return value.codigo >= 0})-->
                <Rotulo v-if="arrayEquipamentos.filter((value) => {return value.local == this.idLocal}).length > 0" nome="Equipamentos">
                    <select v-model="evento.idEquipamento">
                        <option v-for="equipamento in arrayEquipamentos.filter((value) => {return value.local == this.idLocal})"
                            :value="equipamento.id"
                            :key="equipamento.id">{{equipamento.nome}}</option>
                    </select>
                </Rotulo>
            </form>

        </div>
    </div>

</template>
<script>
import Rotulo from './../../components/Rotulo'
export default {
    components: {Rotulo},
    data() {
        return {
            evento: {
                cron: "",
                fimCron: "",
                hora: "",
                idEquipamento: 0,
                status: 0
            },
            idLocal: 0,
            equipamento: {
                idEquipamento: "",
                idLocal: "",
                categoria: ""
            },
            tiposStatus: [
                {codigo: 0, nome: "DESLIGADO"},
                {codigo: 1, nome: "LIGADO"},
                {codigo: -1, nome: "DEFEITUOSO"}
            ],
            arrayLocais: [],
            arrayEquipamentos: []
        }
    },
    methods:{
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
        getEquipamentos() {
            this.$http.get("equipamentos").then(res => {
                for (var i = 0; i < res.data.length; i++) {
                    this.arrayEquipamentos.push({
                        id: res.data[i].idEquipamento,
                        local: res.data[i].idLocal,
                        categoria: res.data[i].idCategoria,
                        nome: res.data[i].nome,
                        descricao: res.data[i].descricao,
                        status: res.data[i].status
                    });
                }
            });
        },
        postEventos(){
            /*this.$http.post("eventos").then(res => {
                for (var i = 0; i < res.data.length; i++) {
                this.arrayEventos.push({
                    id: res.data[i].idEvento,
                    id_equipamento: res.data[i].idEquipamento,
                    status: this.getStatus(res.data[i].status),
                    data_prox_evento: this.getDataHora(res.data[i].hora),
                    cron: res.data[i].cron,
                    fim_cron: res.data[i].fimCron == null ? "INDEFINIDO" : this.getDataHora(res.data[i].fimCron)
                });
                }
                this.table1.data = this.arrayEventos;
            });*/
        }
    },
    mounted(){
        this.getLocais();
        this.getEquipamentos();
    }
}
</script>
<style>
    /*
.conteudo {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

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



.painel {
	flex: 1;
	background: #FFF;
	margin: 0px 10px;
	padding: 20px;
	border: 1px solid #AAA;
	border-radius: 5px;
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