import Dev from '../schemas/Dev';

class DeslikeController {
  async store(request, response) {
    const { devId } = request.params; // TODO pegar dados dos parametros da requisição
    const { user } = request.headers; // TODO pegar dados do cabeçalho da requisição

    const loggedDev = await Dev.findById(user); // TODO buscar dev logado
    const targetDev = await Dev.findById(devId); // TODO buscar dev alvo

    //TODO verificar se o dev alvo existe
    if (!targetDev) {
      return response.status(400).json({ error: 'Dev not found' });
    }

    loggedDev.dislikes.push(targetDev._id); //TODO adicionar o id do dev alvo no campo de deslikes do dev logado

    await loggedDev.save(); //TODO salvar informação adicionada

    return response.json(loggedDev); //TODO retornar o dev logado
  }
}

export default new DeslikeController();
