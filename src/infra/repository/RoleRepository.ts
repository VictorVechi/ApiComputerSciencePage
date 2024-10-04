import { injectable } from "tsyringe";
import BaseRepository from "./BaseRepository";
import RoleModel from "./model/RoleModel";
import { IRole } from "../../domain/repository/model/IRole";


@injectable()
class RoleRepository extends BaseRepository<IRole> {
  constructor() {
    super(RoleModel);
  }
} export default RoleRepository;