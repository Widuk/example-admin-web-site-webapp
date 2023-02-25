import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';


import { of } from 'rxjs';
import { User } from './user.model';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        HttpClientTestingModule,
        MatToolbarModule,
        MatCardModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve users', () => {
    const users: User[] = [
      { id: 1, name: 'Test', email: 'test@example.com' },
      { id: 2, name: 'Test2', email: 'test2@example.com' }
    ];
    spyOn(userService, 'getAllUsers').and.returnValue(of(users));
    component.ngOnInit();
    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(users);
  });

  it('should create user', () => {
    spyOn(userService, 'createUser').and.returnValue(of({ id: 1, name: 'Test', email: 'test@example.com' }));
    component.userForm.setValue({ name: 'Test', email: 'test@gmail.com' });
    component.onSubmit();
    expect(userService.createUser).toHaveBeenCalled();
  });

  it('should update user', () => {
    const user: User = { id: 1, name: 'Test', email: 'test@example.com' };
    spyOn(userService, 'updateUser').and.returnValue(of(user));
    component.editableUserId = user.id;
    component.onUpdateUser(user);
    expect(userService.updateUser).toHaveBeenCalledWith(user.id, user);
    expect(component.editableUserId).toBe(0);
  });

  it('should delete user', () => {
    const users: User[] = [
      { id: 1, name: 'Test', email: 'test@example.com' },
      { id: 2, name: 'Test2', email: 'test2@gmail.com' }
    ];
    spyOn(userService, 'getAllUsers').and.returnValue(of(users));
    spyOn(userService, 'deleteUser').and.returnValue(of({}));
    component.dataSource = users;
    component.onDelete(users[0].id);
    expect(userService.deleteUser).toHaveBeenCalledWith(users[0].id);
  });
});
