import db from '../../database/connection';

class SquadUsuarioontroller {
    async index(req, res) {
        const id_usuario = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;

        if(tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!"});
        }

        try {
            const usuarioSquad = await db("squad_usuario")
                .select("usuario.nome as nome", "squad.nome as squad")
                .join("usuario", { "usuario.id_usuario" : "squad_usuario.id_usuario" })
                .join("squad", { "squad.id_squad" :  "squad_usuario.id_squad" })
                .where({                    
                    "usuario.id_status": 1,
                    "usuario.id_criador": id_usuario
                });
            

            if(usuarioSquad) {
                return res.json(usuarioSquad);
            }
            
        } catch (error) {
            return res.status(500).json({error: "Erro interno no servidor."});            
        }            

    }

    async store(req, res) {
        const tipoUsuario = req.tipoUsuario;
        const { id_squad, id_usuario } = req.body;

        if(tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!"});
        }
        
        if(!(id_squad && id_usuario)) {
            return res.status(400).json({ error: "Squad e usuário são obrigatórios!"});
        }

        // Iremos verificar se o usuário já pertence a squad que foi passada
        const usuarioPertenceSquad = await db("squad_usuario")
            .select("usuario.nome as nome", "squad.nome as squad")
            .join("usuario", { "usuario.id_usuario" : "squad_usuario.id_usuario" })
            .join("squad", { "squad.id_squad" :  "squad_usuario.id_squad" })
            .where({
                "squad_usuario.id_squad" : id_squad,
                "squad_usuario.id_usuario" : id_usuario
            })
            .first();
        
        if(usuarioPertenceSquad) {
             return res.status(400).json({ 
                 error: 
                    `O funcionário ${usuarioPertenceSquad.nome} já pertence a squad ${usuarioPertenceSquad.squad}.`
            });
        }

        try {
            
            await db("squad_usuario").insert({
                id_squad,
                id_usuario
            }).then(() => {
                return res.json({ mensagem: "Usuário foi incluindo a squad com sucesso!"});
            })
            .catch(() => {
                return res.status(400).json({ mensagem: "Erro ao inlcuir usuário a squad!"});
            });
            
            
        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }

    }

    async update(req, res) {
        const tipoUsuario = req.tipoUsuario;
        const id_squadUsuario = req.params.id;        

        const { id_squad, id_usuario } = req.body;

        if(tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!"});
        }
        
        if(!(id_squad && id_usuario)) {
            return res.status(400).json({ error: "Squad e usuário são obrigatórios!"});
        }

        const existeUsuarioSquad = await db("squad_usuario")
        .select("*")        
        .where("squad_usuario.id_squadusuario", id_squadUsuario)
        .first();

        if(!existeUsuarioSquad) {
            return res.status(400).json({ error: "Usuário/Squad não encontrado!"});
        }

        // Iremos verificar se o usuário já pertence a squad que foi passada
        const usuarioPertenceSquad = await db("squad_usuario")
            .select("usuario.nome as nome", "squad.nome as squad")
            .join("usuario", { "usuario.id_usuario" : "squad_usuario.id_usuario" })
            .join("squad", { "squad.id_squad" :  "squad_usuario.id_squad" })
            .where({
                "squad_usuario.id_squad" : id_squad,
                "squad_usuario.id_usuario" : id_usuario
            })
            .first();
        
        if(usuarioPertenceSquad) {
             return res.status(400).json({ 
                 error: 
                    `O funcionário ${usuarioPertenceSquad.nome} já pertence a squad ${usuarioPertenceSquad.squad}.`
            });
        }

        try {
            const usuario_editado = await db('squad_usuario')
                .where("squad_usuario.id_squadusuario", id_squadUsuario)
                .update({
                    id_squad,
                    id_usuario
                });            

            if(usuario_editado) {
                return res.json({error: "Alteração realizada com sucesso!"});
            }
            
        } catch (error) {
            return res.status(500).json({error: "Erro interno no servidor."});
        }

    }

    async delete(req, res) {
        const tipoUsuario = req.tipoUsuario;
        const id_squadusuario = req.params.id;

        if(tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!"});
        }
        
        try {
            const squadUsuario = await db("squad_usuario")
                .where("squad_usuario.id_squadusuario", id_squadusuario)
                .delete();

            if(squadUsuario) {
                return res.json({message: "Squad/Usuario deletado com sucesso!"});
            }

        } catch (error) {
                return res.status(500).json({error: "Erro interno no servidor."}); 
        }
    }
}

export default new SquadUsuarioontroller();