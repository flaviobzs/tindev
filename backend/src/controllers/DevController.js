import Dev from '../schemas/Dev';

import api from '../services/api';

class DevController {
  async index(request, response) {
    const { user } = request.headers;

    const loggedDev = await Dev.findById(user); // dados do usuario logado

    const users = await Dev.find({
      $and: [
        // condição deve passar nos 3 filtros
        { _id: { $ne: user } }, // usuarios que nao seja o usuario logado
        { _id: { $nin: loggedDev.likes } }, // usuarios que nao estejam na listagem de usuarios que foram dado like
        { _id: { $nin: loggedDev.dislikes } }, // usuario que nao estejam na listagem de usuario que foram dado deslike
      ],
    }).sort({ _id: -1 });

    return response.json(users);
  }

  async store(request, response) {
    const { username } = request.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return response.json(userExists); // verificar se o usuario já existe para não permitir um novo cadastro
    }

    const githubResponse = await api.get(`${username}`); // buscar dados do usuario

    const { name, bio, avatar_url: avatar } = githubResponse.data; // dados da resposta (avatar_url renomeado para avatar)

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
