import { CreateOwnerDto } from '../dto/owner.create.dto';
import { toOwnerDto } from '../mapper/mapper';
import { OwnerDto } from '../dto/owner.dto';
import { OwnerEntity } from '../entity/owner.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepo: Repository<OwnerEntity>,
  ) { }

  async findOne(options?: object): Promise<OwnerDto> {
    const owner = await this.ownerRepo.findOne(options);
    return toOwnerDto(owner);
  }

  async create(ownerDto: CreateOwnerDto): Promise<OwnerDto> {
    const { username, password, email } = ownerDto;

    // check if the owner exists in the db
    const ownerInDb = await this.ownerRepo.findOne({ where: { username } });
    if (ownerInDb) {
      throw new HttpException('owner already exists', HttpStatus.BAD_REQUEST);
    }

    const owner: OwnerEntity = await this.ownerRepo.create({
      username,
      password,
      email,
    });

    await this.ownerRepo.save(owner);

    return toOwnerDto(owner);
  }

  private _sanitizeowner(owner: OwnerEntity) {
    delete owner.password;
    return owner;
  }
}
