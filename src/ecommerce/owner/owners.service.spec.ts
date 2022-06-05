import { OwnerEntity } from '../entity/owner.entity';
import { CreateOwnerDto } from '../dto/owner.create.dto';
import { OwnersService } from './owners.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  testOwner,
  mockOwnerRepository
} from '../test-artifacts/repositories/mocks';

describe('OwnersService', () => {
  let service: OwnersService;
  const mockownerService = {
    findOne: jest.fn((options) => {
      return mockOwnerRepository.findOne(options.id);
    }),
    create: jest.fn(
      async (ownerDto: CreateOwnerDto): Promise<OwnerEntity> =>
        mockOwnerRepository.create(ownerDto),
    ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnersService,
        {
          provide: getRepositoryToken(OwnerEntity),
          useValue: mockOwnerRepository,
        },
      ],
    })
      .overrideProvider(OwnersService)
      .useValue(mockownerService)
      .compile();

    service = module.get<OwnersService>(OwnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('owner creation unit test', async () => {
    const owner = await service.create({
      username: 'ramez.ben.aribia',
      email: 'ramez.ben.aribia@gmail.com',
      password: '123456',
    });
    expect(owner).toBeDefined();
    expect(owner.username).toBe('ramez.ben.aribia');
    expect(owner.email).toBe('ramez.ben.aribia@gmail.com');
  });
  it('owner find one unit test', async () => {
    const owner = await service.findOne({ id: testOwner.id });
    expect(owner).toBeDefined();
    expect(owner).toMatchObject(testOwner);

    service
      .findOne({ id: '123' })
      .catch((e) => expect(e).toEqual('Owner not found'));
  });
});
