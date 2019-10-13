<template>
    <div>
        <div class="conteudo">
            <form class="panel panel-default" >
                <div class="panel-heading">{{scope}} Local</div>
                <Rotulo nome="Setor">
                    <input type="text" v-model="local.setor" placeholder="Setor">
                </Rotulo>
                <Rotulo nome="Localização*">
                    <input type="text" v-model="local.localizacao" placeholder="Localização">
                </Rotulo>
                <Rotulo nome="Descrição">
                    <input type="text" v-model="local.descricao" placeholder="Descrição">
                </Rotulo>
                <Rotulo nome="Capacidade">
                    <input type="number" v-model="local.capacidade" placeholder="Qtd de Pessoas">
                </Rotulo>
                <hr>
                <router-link tag="button" class="btn btn-secondary" to="/locais">Voltar</router-link>
				<button type="button" 
                    @click="funcSubmit" 
                    class="btn btn-success" value="Cadastrar">{{scope}}</button>
            </form>
        </div>
    </div>
</template>
<script>

import Rotulo from './../../components/Rotulo'
export default {
    components: {Rotulo},
    props: {
        scope: String,
        local: Object,
        funcSubmit: Function
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
*/
</style>