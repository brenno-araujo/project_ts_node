import ShowUserService from '../../../services/ShowUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ShowUserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ user_id });

    delete user.password;

    return response.json(user);
  }
}
