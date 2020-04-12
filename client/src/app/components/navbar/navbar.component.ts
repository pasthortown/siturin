import { User } from './../../models/profile/User';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ProfilePicture } from 'src/app/models/profile/ProfilePicture';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public pushRightClass: string;
  profileImg = 'assets/images/accounts.png';

  @Input('profile_picture') profile_picture = new ProfilePicture();
  @Input('user') user = new User();

  constructor(private router: Router) {
    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  refreshUser(): Boolean {
    if ( this.profile_picture.id == null ) {
      this.profileImg = 'assets/images/accounts.png';
    } else {
      this.profileImg = 'data:' + this.profile_picture.file_type + ';base64,' + this.profile_picture.file;
    }
    return true;
  }
}
