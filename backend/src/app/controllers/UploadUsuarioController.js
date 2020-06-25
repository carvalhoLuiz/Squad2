import UploadUsuario from '../models/UploadUsuario';
import db from '../../database/connection';

class UploadUsuarioController {
    async show(req, res) {
        const userId = req.idUsuario;

        try {

            if(!userId) {
                return res.status(401).json({ mensagem: "Não autorizado!"});
            }
    
            const existeImg = await UploadUsuario.findOne({ user: userId });
    
            if(!existeImg) {
                return res.status(400).json({ mensagem: "O usuário não tem imagem cadastrada!"});
            }
    
            return res.json({ imgurl: existeImg.img_url });        
            
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno no servidor."});
        }
    }

    async store(req, res) {
        const { filename } = req.file;
        const userId = req.idUsuario;
        
        try {

            if(!userId) {
                return res.status(401).json({ mensagem: "Não autorizado!"});
            }
    
            const existeImg = await UploadUsuario.findOne({ user: userId });

            const gestor_id = await db("usuario as U")
                .select("U.id_criador")
                .where({ id_usuario: userId})
                .first();
    
            if(!existeImg) {
                await UploadUsuario.create({ img_usuario: filename, user: userId, gestor: gestor_id.id_criador });
            }
            
            const query = { user: userId };
    
            const ret = await UploadUsuario.findOneAndUpdate(
                query, 
                { img_usuario: filename }, 
                {new: true}
            );
            
            return res.json({ ret });
            
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno no servidor." });
        }
    }
}

export default new UploadUsuarioController();