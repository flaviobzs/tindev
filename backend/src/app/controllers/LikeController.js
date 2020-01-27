import Dev from '../schemas/Dev';

class LikeController {
  async store(request, response) {
    const { devId } = request.params; // TODO pegar dados dos parametros da requisição
    const { user } = request.headers; // TODO pegar dados do cabeçalho da requisição

    const loggedDev = await Dev.findById(user); // TODO buscar dev logado
    const targetDev = await Dev.findById(devId); // TODO buscar dev alvo

    //TODO verificar se o dev alvo existe
    if (!targetDev) {
      return response.status(400).json({ error: 'Dev not exists' });
    }

    loggedDev.likes.push(targetDev._id); //TODO adicionar o id do dev alvo no campo de likes do dev logado

    await loggedDev.save(); //TODO salvar informação adicionada

    // if (targetDev.likes.includes(loggedDev._id)) { //verificar se houve match entre usuarios

    //   const loggedSocket = request.connectedUsers[user];
    //   const targetSocket = request.connectedUsers[devId];

    //   if (loggedSocket) {
    //     request.io.to(loggedSocket).emit('match', targetDev);
    //   }

    //   if (targetSocket) {
    //     request.io.to(targetSocket).emit('match', loggedDev);
    //   }
    // }

    return response.json(loggedDev); //TODO retornar o dev logado
  }
}

export default new LikeController();
