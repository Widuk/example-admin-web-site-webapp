import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from 'src/app/components/user/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let apiUrl ='http://localhost:3000/api/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', () => {
    const newUser: Omit<User, 'id'> = {
      name: 'Test User',
      email: 'test@example.com',
    };
    service.createUser(newUser).subscribe(user => {
      expect(user).toBeDefined();
      expect(user.name).toEqual('Test User');
      expect(user.email).toEqual('test@example.com');
    });
    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should get all users', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'Test User 1', email: 'test1@example.com' },
      { id: 2, name: 'Test User 2', email: 'test2@example.com' },
    ];
    service.getAllUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });
    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should get a user by id', () => {
    const mockUser: User = { id: 1, name: 'Test User', email: 'test@example.com' };
    service.getUserById(mockUser.id).subscribe(user => {
      expect(user).toBeDefined();
      expect(user.name).toEqual('Test User');
      expect(user.email).toEqual('test@example.com');
    });
    const req = httpMock.expectOne(`${apiUrl}/${mockUser.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should update a user', () => {
    const updatedUser: User = { id: 1, name: 'Updated User', email: 'updated@example.com' };
    service.updateUser(updatedUser.id, updatedUser).subscribe(user => {
      expect(user).toBeDefined();
      expect(user.id).toEqual(updatedUser.id);
      expect(user.name).toEqual(updatedUser.name);
      expect(user.email).toEqual(updatedUser.email);
    });
    const req = httpMock.expectOne(`${apiUrl}/${updatedUser.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });

  it('should delete a user', () => {
    const userId = 1;
    service.deleteUser(userId).subscribe(res => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne(`${apiUrl}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});