import Dev from '../schemas/Dev';

class DeslikeController {
  async store(request, response) {
    const { devId } = request.params;
    const { user } = request.headers;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return response.status(400).json({ error: 'Dev not found' });
    }

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return response.json(loggedDev);
  }
}

export default new DeslikeController();
