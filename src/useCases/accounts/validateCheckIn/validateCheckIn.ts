import { ICheckInsRepository } from '@/repositories/interface/ICheck-ins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFound } from '../errors/resourceNotFound'

interface IValidateCheckInUseCaseRequest {
  checkInId: string
}

interface IValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private checkInRepository: ICheckInsRepository) { }

  public async execute({
    checkInId,
  }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    // atualizar a data para a data atual
    checkIn.validated_at = new Date()
    // salvar o checkIn no banco de dados(atualizar o checkIn)
    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
