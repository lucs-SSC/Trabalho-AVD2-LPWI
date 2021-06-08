const express = require("express")
const app = express()
const uuid = require("uuid")

app.use(express.json())

//Validações com middleware
//1° validação - verificar id inexistente
const verificaID = (request, response, next) =>{
    const { id } = request.params
    const checkID = funcionarios.filter(func => func.id == id)

    if(checkID.length == 0){
        return response
            .status(400)
            .json({
                Erro: 'ID inexistente'
            })
    }
    return next()
}
//2° validação - verificar campo inexistente
const verificaCampo = (request, response,next)=>{
    const {nome, funcao, departamento, email, telefone} = request.body

    if(!nome || !funcao || !departamento || !email || !telefone){
        return response 
            .status(400)
            .json({
                Erro: 'Algum campo necessário para o cadastro esta faltando'
            })
    }
    return next()

}


//a)Criar um cadastro com os seguintes campos: nome, função, departamento, e-mail, telefone
let funcionarios = [{id: uuid.v4() , nome:'Fernanda', funcao:'RH', departamento:'logistica', email:'xxx', telefone:'yyy'}]

/*b) Crie rotas para cadastrar funcionário (deverá ser enviados os campos nome,
função, departamento, e-mail e telefone) e o sistema deverá gerar o id
automaticamente
*/
app.post('/funcionarios', verificaCampo, (request,response)=>{
    const {nome, funcao, departamento,email,telefone} = request.body
    const atributos ={
        id: uuid.v4(),
        nome,
        funcao,
        departamento,
        email,
        telefone
    }
    funcionarios = [...funcionarios, atributos]
    return response
        .status(200)
        .json(funcionarios)
})

//c)Crie uma rota para listar todos funcionários
app.get('/funcionarios',(request, response)=>{
    return response
        .status(200)
        .json(funcionarios)
})

/*d)Crie uma rota para listar o funcionário pelo id, o id deverá ser informado nos
parâmetros da rota
*/
app.get('/funcionarios/:id', verificaID, (request, response)=>{
    const { id } = request.params
    const findByID = funcionarios.filter(func => func.id == id)
    
    return response
        .status(200)
        .json(findByID)

})
/*e)Crie uma rota para excluir um funcionário pelo ID, o id deverá ser informado nos
parâmetros da rota.
*/
app.delete('/funcionarios/:id', verificaID, (request, response)=>{
    const { id } = request.params
    const deleteByID = funcionarios.findIndex(func => func.id == id)
    
    funcionarios.splice(deleteByID, 1)
    return response
        .status(200)
        .json({
            Message: "Funcionario deletado"
        })
})
/*f)Crie uma rota para alterar um funcionário pelo ID, o id deverá ser informado
nos parâmetros da rota
*/ 
app.put('/funcionarios/:id', verificaID, verificaCampo, (request, response)=>{
    const { id } = request.params
    const {nome, funcao, departamento,email,telefone} = request.body
    let changeByID = funcionarios.findIndex(func => func.id == id)
    
    const atributos ={
        id,
        nome,
        funcao,
        departamento,
        email,
        telefone
    }
    
    funcionarios.splice(changeByID, 1, atributos)
    
    return response
        .status(200)
        .json(funcionarios)
})

app.listen(3333, ()=>{
    console.log("Servidor Rodando!!!")
})