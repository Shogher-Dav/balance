import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EntityManager, Repository} from "typeorm";
import { User } from "./entities/user.entity";
import { TransactionalRepository } from "src/database/transaction.repository";

@Injectable()
export class UserRepository extends TransactionalRepository<User, UserRepository> {
 
    constructor(
        @InjectRepository(User)
        repository: Repository<User>,
    ) {
        super(User, repository);
    }

    transactional(entityManager: EntityManager): UserRepository {
        return this.fromEntityManager(
            entityManager,
            (repository) => new UserRepository(repository),
        );
    }
}