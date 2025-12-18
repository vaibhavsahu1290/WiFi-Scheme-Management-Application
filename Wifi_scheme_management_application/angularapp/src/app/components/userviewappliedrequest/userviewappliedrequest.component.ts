import { Component, OnInit } from '@angular/core';
import { WifiSchemeRequestService } from '../../services/wifi-scheme-request.service';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-userviewappliedrequest',
  templateUrl: './userviewappliedrequest.component.html',
  styleUrls: ['./userviewappliedrequest.component.css']
})
export class UserViewAppliedRequestComponent implements OnInit {
  appliedSchemes: {
    scheme: WifiScheme;
    status: string;
    requestId: number;
    requestDate: string;
    comments: string;
    proof: string;
  }[] = [];

  filteredSchemes: {
    scheme: WifiScheme;
    status: string;
    requestId: number;
    requestDate: string;
    comments: string;
    proof: string;
  }[] = [];
  
  selectedRequest: any = null;
  searchTerm: string = '';
  loading: boolean = true;
  showModal:boolean=false;
  userId: number = 0;
  proofUrl: SafeResourceUrl | null = null;

  constructor(
    private readonly requestService: WifiSchemeRequestService,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const loginDTO = localStorage.getItem('loginDTO');
    if (loginDTO) {
      const parsedDTO = JSON.parse(loginDTO);
      this.userId = parsedDTO.userId ?? 0;
    }
    if (!this.userId) {
      console.error('No user ID found in localStorage');
      this.router.navigate(['/login']);
      return;
    }
    console.log('Logged-in User ID:', this.userId);


    this.requestService.getWiFiSchemeRequestsByUserId(this.userId).subscribe({
      next: (requests) => {
        console.log('Requests fetched for user:', requests);
        this.appliedSchemes = requests.map(req => ({
          scheme: req.wifiScheme,
          status: req.status ?? 'Pending',
          requestId: req.wifiSchemeRequestId ?? 0,
          requestDate: req.requestDate instanceof Date 
            ? req.requestDate.toISOString() 
            : (req.requestDate ?? new Date().toISOString()),
          comments: req.comments ?? '',
          proof: req.proof ?? ''
        }));        
        this.filteredSchemes = [...this.appliedSchemes];
        console.log('Matched Applied Schemes:', this.appliedSchemes);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.filteredSchemes = this.appliedSchemes.filter(item =>
      item.scheme.schemeName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  writeReview(wifiSchemeId: number): void {
    this.router.navigate(['/user/feedback', wifiSchemeId]);
  }

  showMore(item: any): void {
    this.selectedRequest = item;
    this.toggleOpen(item.proof);
  }

  closeModal(): void {
    if (this.proofUrl) {
      URL.revokeObjectURL(this.proofUrl.toString());
    }
    this.selectedRequest = null;
    this.proofUrl = null;
    this.toggleClose();
  }
  
  showDeleteConfirm = false;
requestToDelete: number | null = null;

toggleOpen(base64Image: string): void {
  if (base64Image) {
    this.proofUrl = 'data:image/jpeg;base64,' + base64Image;
    this.showModal = true;
  }
}
toggleClose(): void {
  this.showModal = false;
  this.proofUrl = "";
}


cancelDelete(): void {
  this.showDeleteConfirm = false;
  this.requestToDelete = null;
}
promptDelete(requestId: number, wifiSchemeId: number): void {
  this.requestToDelete = requestId;
  this.showDeleteConfirm = true;
}
confirmDelete(): void {
  if (this.requestToDelete !== null) {
    this.requestService.deleteWiFiSchemeRequest(this.requestToDelete).subscribe(() => {
      this.appliedSchemes = this.appliedSchemes.filter(item => item.requestId !== this.requestToDelete);
      this.filteredSchemes = this.filteredSchemes.filter(item => item.requestId !== this.requestToDelete);
      this.showDeleteConfirm = false;
      this.requestToDelete = null;
      if (this.selectedRequest?.requestId === this.requestToDelete) {
        this.toggleClose();
      }
    });
  }
}


}