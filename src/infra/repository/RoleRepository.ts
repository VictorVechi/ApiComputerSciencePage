import { injectable } from "tsyringe";
import BaseRepository from "./BaseRepository";
import RoleModel from "./model/RoleModel";
import { IRoleSchema } from "../../domain/repository/model/IRole";


@injectable()
export default class RoleRepository extends BaseRepository<IRoleSchema> {
  constructor() {
    super(RoleModel);
  }

  async findByName(name: string): Promise<IRoleSchema | null> {
    return await this.findByField({ name: name });
  }
};