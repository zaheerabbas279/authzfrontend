import { Component, OnInit } from '@angular/core';
import { AuthsrvService } from 'src/app/services/authsrv.service';
import { UsersService } from 'src/app/services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usersList: any;
  firstName: any;
  lastName: any;
  phoneNumber: any;
  email: any;
  address: any;
  profile: any;

  resFirstName: any;
  reslastName: any;
  resemail_id: any;
  resphoneNumber: any;
  resaddress: any;
  resprofile: any;



  displayStyle = "none";
  clickedUserData: any = {};
  userId: any;
  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email_id: new FormControl(''),
    profile: new FormControl(''),
    phoneNumber: new FormControl(''),
    address: new FormControl(''),
  });

  private imageSrc: string = '';
  constructor(private auth: AuthsrvService, private user: UsersService) { }

  ngOnInit(): void {
    this.getAllUsersList();
  }

  logout() {
    this.auth.logout();
  }

  getAllUsersList() {
    this.user.getAllUsers().subscribe((res) => {
      if (res) {
        this.usersList = res;
        console.log('res- users', this.usersList);
      }
    })
  }

  addUser() {
    let data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email_id: this.email,
      profile: this.profile,
      phoneNumber: this.phoneNumber,
      address: this.address
    }
    this.user.addNewUsers(data).subscribe((res) => {
      if (res) {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phoneNumber = "";
        this.profile = "";
        this.address = "";
        this.imageSrc = "";
        console.log('user added successfully!!');
        alert('Added Successfully!!!!');
        this.getAllUsersList();
      }

    })
  }


  openPopup(data: any) {
    this.displayStyle = "block";
    this.userId = data._id;
    this.user.getUserById(data._id).subscribe((res: any) => {
      if (res) {
        // this.clickedUserData = res;
        this.resFirstName = res.firstName,
          this.reslastName = res.lastName,
          this.resemail_id = res.email_id,
          this.resprofile = res.profile,
          this.resphoneNumber = res.phoneNumber,
          this.resaddress = res.address
        // console.log('User details is--->', this.clickedUserData);
      }
      else {
        console.log('Error getting the data');
      }
    })
  }
  closePopup() {
    this.displayStyle = "none";
  }

  updateuser() {
    let data = {
      firstName: this.resFirstName,
      lastName: this.reslastName,
      email_id: this.resemail_id,
      phoneNumber: this.resphoneNumber,
      address: this.resaddress,
      profile: this.resprofile
    }
    console.log('form data for upate', data);
    this.user.updateUserById(this.userId, data).subscribe((res) => {
      if (res) {
        console.log('User updated successfully!!');
        this.displayStyle = "none";
        this.imageSrc = "";
        this.getAllUsersList();
      }
      else {
        console.log('Error while updating the data');
      }
    })
  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.resprofile = this.imageSrc;
    this.profile = this.imageSrc;
  }
}
