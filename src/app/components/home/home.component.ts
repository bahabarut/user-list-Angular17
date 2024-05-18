import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserList } from '../../models/user-list';
import { UserModel } from '../../models/user-model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = Object.keys(UserList[0]);
  // displayedColumns: string[] = ["id", "name", "age", "gender", "email", "phone", "process"];
  dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
    this.displayedColumns.push("process");

    this.dataSource = new MatTableDataSource(UserList);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  DataFilter(ev: any) {
    const filterValue = (ev.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  EditUser(user: UserModel) {
    this.openDialog(user);
  }
  DeleteUser(user: UserModel) {
    this.openDialog(user);
  }

  openDialog(user: UserModel): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: user,
      width: "30rem",
      disableClose: false,
      autoFocus: true,
      panelClass: "",

    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const index = this.dataSource.data.findIndex(item => item.id === res.id);
        if (index !== -1) {
          this.dataSource.data[index] = res;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }
  TranslateHeaders(header: string): string {
    switch (header) {
      case "id": return "Id";
      case "name": return "Name";
      case "age": return "Age";
      case "gender": return "Gender";
      case "email": return "Email";
      case "phone": return "Phone";
      case "company": return "Company Name";
      default: return "";
    }
  }
}
