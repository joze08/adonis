import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'

export default class MessagesController {
  public async index({ }: HttpContextContract) {
    const message = await Message.query().preload('user');
    return message;
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = request.only(["texto"]);
    const message = await Message.create({ ...data, userId: auth.user?.id });
    return message;
  }

  public async show({ params }: HttpContextContract) {
    const message = await Message.query().where("texto", "like", `%${params.id}%`);
    return message;
  }

  public async update({ params, request }: HttpContextContract) {
    const message = await Message.findOrFail(params.id);
    const { texto } = request.only(["texto"]);
    message.texto = texto;
    await message.save();
    return message;
  }

  public async destroy({ params }: HttpContextContract) {
    const message = await Message.findOrFail(params.id);
    await message.delete()
    return message;
  }
}
