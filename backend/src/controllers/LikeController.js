import Dev from '../schemas/Dev';

class LikeController {
  async store(request, response) {
    const { devId } = request.params;
    const { user } = request.headers; // dado do usuario logado

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return response.status(400).json({ error: 'Dev not exists' });
    }

    loggedDev.likes.push(targetDev._id); // adicionar o usuario logado no campo de liked do usuario da busca

    await loggedDev.save();

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

    return response.json(loggedDev);
  }
}

export default new LikeController();
