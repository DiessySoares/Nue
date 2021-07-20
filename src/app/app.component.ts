import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';
import { AuthService } from './service/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private sidebarService: NbSidebarService,
    private authService: AuthService
  ) { }

  public viewState = true;

  public userName = '';

  items: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/home',
      icon: 'home-outline',
    },
    {
      title: 'Receita',
      link: '/revenue',
      icon: { icon: 'trending-up-outline', status: 'success' },
    },
    {
      title: 'Gastos',
      link: '/spent',
      icon: { icon: 'trending-down-outline', status: 'danger' },
    },
    {
      title: 'Lista de compra',
      link: '/shoplist',
      icon: 'shopping-cart-outline',
    },
    {
      title: 'Configuração',
      link: '/config',
      icon: 'settings-outline',
    },
  ];

  ngOnInit() {
    this.sidebarService.collapse();
  }

  canShow(): boolean {
    return this.authService.isAuthenticated();
  }

  getUserName() {
    return this.authService.currentUser().usuName;
  }

  greetings() {
    let hour = new Date().getHours();
    return (hour > 5 && hour <= 12 ? "Bom dia!" : hour > 12 && hour <= 18 ? "Boa tarde!" : "Boa noite!") + " :)";
  }

  toggle() {
    this.sidebarService.toggle(false);
    this.sidebarService.getSidebarState("sidebar").subscribe(status => {
      this.viewState = (status == "collapsed");
    }
    )
  }

  viewVisible() {
    this.sidebarService.getSidebarState().subscribe(status => {
      return status == "collapsed";
    }
    )
  }


}
