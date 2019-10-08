<template>
    <div>
        <div class="conteudo">
            <form class="panel panel-default">
                <div class="panel-heading">Cadastro Evento</div>
                <Rotulo nome="CRON">
                    <input type="text" v-model="evento.cron" placeholder="* */1 * 1/1 * *">
                </Rotulo>
                <Rotulo nome="Hora Evento">
                    <input type="date" v-model="evento.hora.data">
                    <input type="time" v-model="evento.hora.hora">
                </Rotulo>
                <Rotulo nome="Fim do CRON">
                    <input type="date" v-model="evento.fimCron.data">
                    <input type="time" v-model="evento.fimCron.hora">
                </Rotulo>
                <div class="indentificacao">
                    <Rotulo nome="Locais">
                        <select v-model="idLocal">
                            <option v-for="locais in arrayLocais"
                                :value="locais.idLocal"
                                :key="locais.idLocal">{{locais.localizacao}}</option>
                        </select>
                        <select  v-if="arrayEquipamentos.filter((value) => {return value.local == this.idLocal}).length > 0" v-model="evento.idEquipamento">
                            <option v-for="equipamento in arrayEquipamentos.filter((value) => {return value.local == this.idLocal})"
                                :value="equipamento.id"
                                :key="equipamento.id">{{equipamento.nome}}</option>
                        </select>
                    </Rotulo>
                    <!--tiposStatus.filter((value) => {return value.codigo >= 0})-->
                    
                </div>
                <Rotulo nome="Ação">
                    <select v-model="evento.status">
                        <option v-for="status in tiposStatus"
                            :value="status.codigo"
                            :selected="status.codigo === 1"
                            :key="status.codigo">{{status.nome}}</option>
                    </select>
                </Rotulo>
                <hr>
				<button @click.prevent="postEvento" type="button" class="btn btn-success">Cadastrar</button>
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
                fimCron: {
                    data:"",
                    hora:""
                },
                hora: {
                    data:"",
                    hora:""
                },
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
                {codigo: 0, nome: "DESLIGAR"},
                {codigo: 1, nome: "LIGAR"}
                //{codigo: -1, nome: "DEFEITUOSO"}
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
        postEvento(){
            this.$http.post('eventos', {
                cron: this.evento.cron,
                fimCron: this.evento.fimCron.data + "T" + this.evento.fimCron.hora,
                hora: this.evento.hora.data + "T" + this.evento.hora.hora,
                idEquipamento: this.evento.idEquipamento,
                status: this.evento.status
            })
            /*this.$http.post('usuarios.json', {
                    nome: 'José',
                    email: 'ze@gmail.com'
		        }).then(res => console.log(res))
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