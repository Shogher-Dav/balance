import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common"
import { EntityManager } from "typeorm"
import { UserRepository } from "./user.repository"
import { WithdrawDto } from "./dto/withdraw.dto"


@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)

    constructor(
      private readonly userRepository: UserRepository,
      private readonly entityManager: EntityManager
    ) {}

    async withdrawMoney(withDrawDto: WithdrawDto) {
      const { id, amount } = withDrawDto
        await this.entityManager.transaction(async em => {
            await this.updateBalance(id, amount, em)
        }).catch(err => {
            this.logger.error(`Transaction failed {err=${err}}`)
            if(err.code == "ER_DUP_ENTRY") {
                throw new ConflictException()
            }
            throw err
        })

      return' Money successfully withdrawn'
    }

    private async updateBalance(id, amount: number, em: EntityManager) {
      const {userRepository} = this.transactionalRepositories(em);

      const currentUser = await userRepository.findOneBy({
        id
      });
      if(currentUser.balance - amount < 0){
        throw new InternalServerErrorException('Insufficient funds in the account')
      }
    
      await userRepository.update(id, {
         balance: currentUser.balance - amount
      });
      this.logger.log(`Money successfully withdrawn from ${currentUser.name}`)

    }


    private transactionalRepositories(entityManager: EntityManager) {
        return {
            userRepository: this.userRepository.transactional(entityManager),
        };
    }
}