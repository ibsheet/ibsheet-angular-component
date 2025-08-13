import {
  Component,
  Input,
  OnInit,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  inject,
} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import type {
  IBSheetCreateOptions,
  IBSheetInstance,
  IBSheetOptions,
} from '@ibsheet/interface';

@Component({
  selector: 'ibsheet-angular',
  standalone: true,
  imports: [CommonModule],
  template: ``,
})
export class IBSheetAngular implements OnInit, AfterViewInit, OnDestroy {
  @Input() options!: IBSheetOptions;
  @Input() data: any[] = [];
  @Input() sync?: boolean;
  @Input() style: any;

  // 기존에 생성된 IBSheetInstance를 입력받아 재사용 가능
  @Input() exgSheet?: IBSheetInstance;

  @Output() instance = new EventEmitter<IBSheetInstance>();

  public readonly containerId: string;
  public readonly sheetId: string;

  private sheetObj: IBSheetInstance | undefined;
  private retryInterval: ReturnType<typeof setInterval> | null = null;

  private sheetContainer: HTMLDivElement | null = null;

  readonly elementRef = inject(ElementRef);

  constructor() {
    this.containerId = 'ibsheet-container-' + this.generateSheetId(10);
    this.sheetId = 'sheet_' + this.generateSheetId(10);
  }

  ngOnInit(): void {
    if (!this.options) {
      console.error('[IBSheetAngular] required input value "options" not set');
      throw new Error(
        '[IBSheetAngular] "options" is a required input; you must provide an IBSheet setting object',
      );
    }
  }

  async ngAfterViewInit(): Promise<void> {
    this.createManualDiv();
    if (this.exgSheet) {
      this.sheetObj = this.exgSheet;

      if (this.sheetContainer) {
        const oldEl = document.getElementById(this.sheetId);
        if (oldEl && oldEl.parentElement !== this.sheetContainer) {
          const parent = oldEl.parentElement;
          if (parent) {
            parent.removeChild(oldEl);
          }
          this.sheetContainer.appendChild(oldEl);
        }
      }

      this.instance.emit(this.sheetObj);
    } else {
      // 기존 시트가 없으면 새로 생성
      this.initializeSheet();
    }
  }

  private createManualDiv(): void {
    const container = document.createElement('div');
    if (container) {
      const targetStyle = this.style || { width: '100%', height: '800px' };

      Object.entries(targetStyle).forEach(([key, value]) => {
        (container.style as any)[key] = value;
      });

      container.id = this.containerId;
      container.className = 'ibsheet-container';

      this.elementRef.nativeElement.appendChild(container);
      this.sheetContainer = container;
    }
  }

  ngOnDestroy(): void {
    if (this.retryInterval) {
      clearInterval(this.retryInterval);
      this.retryInterval = null;
    }
    if (this.sheetObj) {
      try {
        this.sheetObj.dispose?.();
      } catch (error) {
        console.warn('Error disposing IBSheet instance:', error);
      }
    }
  }

  private generateSheetId(len: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
          if (this.retryInterval) {
            clearInterval(this.retryInterval);
            this.retryInterval = null;
          }

          const opt: IBSheetCreateOptions = {
            id: this.sheetId,
            el: this.sheetContainer || undefined,
            options: this.options,
            data: this.data,
            sync: this.sync ?? false,
          };

          this.sheetObj = IBSheet.create(opt);

          this.instance.emit(this.sheetObj);
        } else {
          retryCount++;
          if (retryCount >= maxRetries) {
            if (this.retryInterval) {
              clearInterval(this.retryInterval);
              this.retryInterval = null;
            }
            console.error(
              '[initializeIBSheet] IBSheet Initialization Failed: Maximum Retry Exceeded',
            );
          }
        }
      }, intervalTime);
    } catch (error) {
      console.error('Error initializing IBSheet:', error);
    }
  }
}
