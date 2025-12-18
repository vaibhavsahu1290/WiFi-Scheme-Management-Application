
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';

export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const today = new Date();
  selectedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today ? null : { pastDate: true };
}

@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css']
})
export class UseraddrequestComponent implements OnInit {
  requestForm!: FormGroup;
  success = false;
  error = '';
  fileError = '';
  fileName: string = ''; // ✅ Stores selected file name
  successPopup = false;
  userId: number = 0;
  wifiSchemeId: number = 0;
  scheme: any = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly requestService: WifiSchemeRequestService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const loginDTO = localStorage.getItem('loginDTO');
    if (loginDTO) {
      const parsedDTO = JSON.parse(loginDTO);
      this.userId = parsedDTO.userId ?? 0;
      console.log(this.userId);
    } else {
      this.error = 'Please log in to submit a request.';
      this.router.navigate(['/login']);
      return;
    }

    this.route.params.subscribe(params => {
      this.wifiSchemeId = +params['wifiSchemeId'];
      console.log('wifiSchemeId:', this.wifiSchemeId);

      this.requestForm = this.fb.group({
        streetName: ['', Validators.required],
        landmark: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        preferredSetupDate: ['', [Validators.required, futureDateValidator]],
        timeSlot: ['', Validators.required],
        comments: [''],
        proof: ['', Validators.required], // ✅ Base64 image field
        userId: [this.userId, Validators.required],
        wifiSchemeId: [this.wifiSchemeId, Validators.required],
        requestDate: [new Date(), Validators.required],
        status: ['Pending']
      });
    });
  }

  // ✅ Converts selected image to Base64 and patches into form
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.requestForm.patchValue({ proof: base64String });
        console.log('Base64 Image:', base64String);
      };
      reader.readAsDataURL(file);
    }
  }

  submitRequest(): void {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;

      const requestData = {
        user: { userId: formValue.userId },
        wifiScheme: { wifiSchemeId: formValue.wifiSchemeId },
        requestDate: formValue.requestDate,
        status: formValue.status,
        comments: formValue.comments,
        proof: formValue.proof, // ✅ Base64 image included
        streetName: formValue.streetName,
        landmark: formValue.landmark,
        city: formValue.city,
        state: formValue.state,
        zipCode: formValue.zipCode,
        preferredSetupDate: formValue.preferredSetupDate,
        timeSlot: formValue.timeSlot
      };

      this.requestService.addWiFiSchemeRequest(requestData).subscribe({
        next: () => {
          this.success = true;
          this.successPopup = true;
          this.error = '';
          this.fileName = '';
        },
        error: (err) => {
          console.error('API Error:', err);
          this.error = err?.error?.message ?? 'Something went wrong!';
          this.success = false;
        }
      });
    } else {
      this.error = 'Please fill all required fields correctly.';
      this.success = false;
      console.log('Form invalid:', this.requestForm.errors);
    }
  }

  closePopup(): void {
    this.successPopup = false;
    this.router.navigate(['/user/applied-requests']);
  }

  redirectToScheme(): void {
    this.router.navigate(['/user/wifi-schemes']);
  }
}

