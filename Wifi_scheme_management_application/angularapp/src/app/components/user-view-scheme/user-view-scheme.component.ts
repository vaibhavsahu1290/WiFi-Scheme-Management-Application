import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { AuthService } from 'src/app/services/auth.service';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

@Component({
  selector: 'app-user-view-scheme',
  templateUrl: './user-view-scheme.component.html',
  styleUrls: ['./user-view-scheme.component.css']
})
export class UserViewSchemeComponent implements OnInit {
  searchTerm = '';
  schemes: WifiScheme[] = [];
  filteredSchemes: WifiScheme[] = [];
  proof: string = '';
  showModal:boolean=false;

  constructor(private readonly wifiSchemeService: WifiSchemeService, private readonly router : Router, private readonly authservice: AuthService) { }

  ngOnInit(): void {
    this.fetchSchemes();
    console.log(this.hasApplied);
  }

  fetchSchemes(): void {
    this.wifiSchemeService.getAllWiFiSchemes().subscribe({
      next: (data: WifiScheme[]) => {
        this.schemes = data.filter(s => s.availabilityStatus === 'Available'); 
        this.filteredSchemes = [...this.schemes];
      },
      error: (err) => {
        console.error('Error fetching schemes:', err);
      }
    });
  }

  filterSchemes(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredSchemes = this.schemes.filter(s =>
      s.schemeName.toLowerCase().includes(term) ||
      s.description.toLowerCase().includes(term) ||
      s.region.toLowerCase().includes(term)
    );
  }

  addFeedback(id:number){
    this.router.navigate(['/user/feedback/'+id]);
  }

  hasApplied=false;

  toggleApply(scheme:WifiScheme): void{
    this.hasApplied=true;
    this.handleAction(scheme);
  }

  handleAction(scheme: WifiScheme): void {

    console.log('Navigating with scheme:', scheme);
    
    this.router.navigate(['/user/wifi-req', scheme.wifiSchemeId]);
  }

  isLoggedIn() {
    return this.authservice.isLoggedIn() &&
      this.authservice.getUserRole().toLowerCase() === 'user';
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  toggleOpen(base64Image: string): void {
        if (base64Image) {
          this.proof = 'data:image/jpeg;base64,' + base64Image;
          this.showModal = true;
        }
      }

      toggleClose(): void {
            this.showModal = false;
            this.proof = '';
          }



}




