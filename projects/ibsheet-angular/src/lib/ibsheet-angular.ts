import { Component, Input, OnInit, ElementRef, OnDestroy, AfterViewInit, output } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBSheetOptions } from './ibsheet-angular.interface'

@Component({
  selector: 'ibsheet-angular',
  standalone: true,
  imports: [CommonModule],
  template: ``
})
export class IBSheetAngular implements OnInit, AfterViewInit, OnDestroy {
  @Input() options!: IBSheetOptions;
  @Input() data: any[] = [];
  @Input() sync?: boolean;
  @Input() style: any;

  @Output() sheetInstance = new EventEmitter<any>();

  public containerId: string;
  public sheetId: string;

  private sheetObj: any;
  private retryInterval: any;

  private sheetContainer: HTMLDivElement | null = null;

  constructor(private elementRef: ElementRef) {
    this.containerId = 'ibsheet-container-' + this.generateSheetId(10);
    this.sheetId = 'sheet_' + this.generateSheetId(10);
  }

  ngOnInit(): void {
    // console.log('IBSheet Angular Component initialized with ID:', this.containerId);
    // console.log('IBSheet Angular Component initialized with sheet ID:', this.sheetId);
    if (!this.options) {
      console.error ('[IBSheetAngular] required input value "options" not set');
      throw new Error ('[IBSheetAngular] "options" is a required input; you must provide an IBSheet setting object');
    }
  }

  async ngAfterViewInit(): Promise<void> {
    this.createManualDiv();

    setTimeout(() => {
      this.initializeSheet();
    }, 100);
  }

  private createManualDiv(): void {
    const container = document.createElement('div');
    if (container) {
      const targetStyle = this.style || { width: '100%', height: '800px' };
  
      Object.keys(targetStyle).forEach(key => {
        (container.style as any)[key] = targetStyle[key];
      });
      
      container.id = this.containerId;
      container.className = 'ibsheet-container';
  
      this.elementRef.nativeElement.appendChild(container);
      this.sheetContainer = container;
    }
  }

  ngOnDestroy(): void {
    if (this.sheetObj) {
      try {
        if (this.sheetObj.dispose) {
          this.sheetObj.dispose();
        }
      } catch (error) {
        console.warn('Error disposing IBSheet instance:', error);
      }
    }
  }

  private generateSheetId(len: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private initializeSheet(): void {
    try {
      
      let retryCount = 0;
      const maxRetries = 50;
      const intervalTime = 100;
      
      this.retryInterval = setInterval(() => {
        const IBSheet = (window as any).IBSheet;
        if (IBSheet && IBSheet.version) {
          clearInterval(this.retryInterval);

          this.sheetObj = IBSheet.create({
            id: this.sheetId,
            el: this.sheetContainer,
            options: this.options,
            data: this.data ?? [],
            sync: this.sync ?? false
          });

          this.sheetInstance.emit(this.sheetObj);
        } else {
          retryCount++;
          if (retryCount >= maxRetries) {
            clearInterval(this.retryInterval);
            console.error ('[initializeIBSheet] IBSheet Initialization Failed: Maximum Retry Exceeded');
          } else {
            // console.warn(`[initializeIBSheet] Waiting to load IBSheet... ${retryCount * 100}ms`);
          }
        }
      }, intervalTime);
    } catch (error) {
      console.error('Error initializing IBSheet:', error);
    }
  }
}