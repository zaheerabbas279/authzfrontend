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


  // detailed address
  addrId: any;
  pin: any;
  state: any;

  detailedAddress: any = {};


  displayStyle = "none";
  displayAddrStyle = "none";
  displayDetAddrStyle = "none";

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
      this.getDetailedAddress();
    })
  }


  getDetailedAddress() {
    this.user.getDetailedAddressById(this.userId).subscribe((res: any) => {
      if (res) {
        this.detailedAddress = res;
        console.log('the deltailed addres is', this.detailedAddress);
      }
      else {
        console.log('error facing detailed address');
      }
    })
  }


  openPopupAddress() {
    this.displayAddrStyle = "block";
  }

  address__: any;
  openPopupShowDetailedAddrr() {
    let id: any;
    let userId: any;
    let itemDet: any;
    let addr: any;
    this.displayDetAddrStyle = "block";
    this.user.getAllDetailAddress().subscribe((res: any) => {
      if (res) {
        console.log('res', res);
        res.map((item: any) => {
          if (item._id === item.detailAddr[0].user_id) {
            console.log("matched", item._id);
          } else {
            console.log("NO match", item._id);
          }
        })

      }
      else {
        console.log('error while getting the details');

      }
    })
  }

  closePopup() {
    this.detailedAddress = "";
    this.displayStyle = "none";
  }
  closePopupAddress() {
    this.pin = "";
    this.addrId = "";
    this.state = "";
    this.displayAddrStyle = "none";
  }

  closePopupDetailedAddress() {
    this.displayDetAddrStyle = "none";
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

  addDetailedAddr() {
    this.addrId = this.userId;
    let data = {
      user_id: this.addrId,
      pin: this.pin,
      state: this.state
    }
    this.user.addDetailedAddress(data).subscribe((res: any) => {
      if (res) {
        alert('Address addedd successfully!!');
        console.log('detailed address addedd!');
        this.closePopupAddress();
      }
    })
    console.log('the detailed address is', data);

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
