# Software Testing: Unit, Integration, End-to-end
This repository will hold an example of how to test a backend application. 
## Navigation guide
- You'll find the test written in files following this glob pattern: `*.spec.ts`
- The mocked data will be contained in this [products.mock.ts](./src/products/mock/products.mock.ts) file.
- The e2e tests are written in this file: [app.e2e-spec.ts](./test/app.e2e-spec.ts).

## Running the tests:
To run the test, we have to first to build our project and startup postgres with docker.
Follow these steps:
1. Clone the repository.
2. `npm install`
3. `npm run build`
4. `docker-compose up`
5. `npm run test` for unit and integration tests.
6. `npm run test:e2e` to run the e2e tests.

## Detailed explanation
For the unit tests, since we'd want to mock the API calls and the Database calls, I encapculated the mocked repositories pattern used for the different entities in this [file](./src/products/test-artifacts/repositories/mocks.ts). This is a brief explanation of the file:

Every repository is in this form: 
```typescript
const xRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
}
```
Then the jest library allows to mock the implementation of the repository functions to fit our test logic.

```typescript

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockOwnerRepository,
        },
      ],
    })
      .overrideProvider(OwnersService)
      .useValue(mockOwnerService)
      .compile();

    service = module.get<OwnersService>(OwnersService);
  });
```
In the normal service definition, we defined it this way instead
```typescript
export class OwnersService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly OwnerRepo: Repository<OwnerEntity>,
  ) {}
  // Some methods definitions
}
```
The ownerRepo is a dependency of the service, so we have to overwrite it with our mocked dependency to run the unit tests.

After the dependencies are mocked, we now have to mock the service itself. This can be achieved like this: 
```typescript
describe('OwnersService', () => {
  let service: OwnersService;
  const mockOwnerService = {
    findOne: jest.fn((options) => {
      return mockOwnerRepository.findOne(options.id);
    }),
    create: jest.fn(
      async (userDto: CreateOwnerDto): Promise<OWnerEntity> =>
        mockUserRepository.create(OwnerDto),
    ),
  };
```