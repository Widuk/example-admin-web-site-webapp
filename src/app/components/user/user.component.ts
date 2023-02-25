import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user/user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'actions'];
  userForm: FormGroup;
  updateForm: FormGroup<any>;
  users: User[];
  editableUserId: number;
  dataSource: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.users = [];
    this.editableUserId = 0;
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.snackBar.open(`Users retrieved `, 'Close', {
        duration: 1000,
      });
    });
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => this.snackBar.open(`Error retrieving users ${error}`, 'Close', {
        duration: 2000,
      })
    });
  }

  onSubmit() {
    const user: Omit<User, 'id'> = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
    };
    this.userService.createUser(user).subscribe({
      next: (user) => {
        this.getUsers();
        this.snackBar.open(`User with id ${user.id} created`, 'Close', {
          duration: 2000,
        });
      },
      error: (error) =>
        this.snackBar.open(`Error creating user ${JSON.stringify(user)}`, 'Close', {
          duration: 2000,
        })
    });
    this.userForm.reset();
  }

  onUpdateUser(user: User): void {
    this.editableUserId = 0;
    this.userService.updateUser(user.id, user).subscribe({
      next: () => this.snackBar.open(`User with id ${user.id} updated`, 'Close', {
        duration: 2000,
      }),
      error: () => this.snackBar.open(`Error updating User with id ${user.id}`, 'Close', {
        duration: 2000,
      })
    });
  }

  onDelete(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.snackBar.open(`User with id ${id} deleted`, 'Close', {
          duration: 2000,
        });
        // this.getUsers();
      },
      error: (error) => this.snackBar.open(`Error deleting User with id ${id}`, 'Close', {
        duration: 2000,
      })
    });
  }

  editUser(user: User) {
    this.editableUserId = user.id;
  }

  cancelEdit() {
    this.editableUserId = 0;
  }
}
