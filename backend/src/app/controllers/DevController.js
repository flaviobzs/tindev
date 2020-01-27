import Dev from '../schemas/Dev';

import api from '../services/api';

class DevController {
  async index(request, response) {
    const { user } = request.headers; // TODO pegar dados do cabeçalho da requisição

    const loggedDev = await Dev.findById(user); // TODO buscar o dev logado

    const users = await Dev.find({
      $and: [
        //TODO condição deve passar nos 3 filtros
        { _id: { $ne: user } }, //TODO usuarios que nao seja o logado
        { _id: { $nin: loggedDev.likes } }, //TODO usuarios que nao estejam na listagem de usuarios que foram dado like
        { _id: { $nin: loggedDev.dislikes } }, //TODO usuario que nao estejam na listagem de usuario que foram dado deslike
      ],
    }).sort({ _id: -1 });

    return response.json(users); //TODO retornar os usuarios enquadrados
  }

  async store(request, response) {
    const { username } = request.body; // TODO pegar dados do corpo da requisição

    const userExists = await Dev.findOne({ user: username }); // TODO buscar o usuario

    //TODO verificar se um usuario já existe
    if (userExists) {
      return response.json(userExists);
    }

    const githubResponse = await api.get(`users/${username}`); //TODO buscar dados do usuario na api do github

    const { name, bio, avatar_url: avatar } = githubResponse.data; //TODO pegar dados da resposta (avatar_url renomeado para avatar)

    //TODO criar um dev
    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar,
    });

    return response.json(dev);
  }
}

export default new DevController();
