# ibsheet-angular

An Angular wrapper component for IBSheet, providing seamless integration of IBSheet spreadsheet functionality into Angular applications.

## Features

- 🔧 Easy integration with IBSheet library
- ⚡ Automatic initialization and cleanup
- 🎯 TypeScript support
- 🔄 Data synchronization support
- 📤 Event emission for sheet instance access
- 🎨 Customizable styling
- 🚀 Standalone component (Angular 14+)

## Installation

Make sure you have IBSheet library loaded in your project before using this component.

```bash
yarn install ibsheet-angular
```

## Usage

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { IBSheetAngular, type IBSheetOptions } from 'ibsheet-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [IBSheetAngular],
  template: `
    <div>
      <h1>My Spreadsheet</h1>
      <ibsheet-angular
        [options]="sheetOptions"
        [data]="sheetData">
      </ibsheet-angular>
    </div>
  `
})
export class ExampleComponent {
  sheetOptions: IBSheetOptions = {
    Cfg: {
      SearchMode: 2,
      HeaderMerge: 3
    },
    Cols: [
      { Header: "ID", Type: "Text", Name: "id" },
      { Header: "Name", Type: "Text", Name: "name" },
      { Header: "Age", Type: "Int", Name: "age" }
    ]
  };

  sheetData = [
    { id: "1", name: "John Doe", age: 30 },
    { id: "2", name: "Jane Smith", age: 25 }
  ];
}
```

### Advanced Usage with Event Handling

```typescript
import { Component } from '@angular/core';
import { IBSheetAngular, IB_Preset, type IBSheetInstance, type IBSheetOptions } from 'ibsheet-angular';

@Component({
  selector: 'app-advanced',
  standalone: true,
  imports: [IBSheetAngular],
  template: `
    <div>
      <div>
        <button (click)="addRow()">Add Row</button>
        <button (click)="getData()">Get Data</button>
      </div>
      
      <ibsheet-angular
        [options]="sheetOptions"
        [data]="sheetData"
        [sync]="false"
        [style]="customStyle"
        (sheetInstance)="onSheetReady($event)">
      </ibsheet-angular>
    </div>
  `
})
export class AdvancedComponent {
  private sheet: IBSheetInstance | undefined

  sheetOptions: IBSheetOptions = {
    // Your IBSheet configuration options
    Cfg: {
      SearchMode: 2,
      HeaderMerge: 3
    },
    Cols: [
      { Header: "ID", Type: "Text", Name: "id" },
      { Header: "Name", Type: "Text", Name: "name" },
      { Header: "Age", Type: "Int", Name: "age" },
      { Header: "Ymd", Name: "sDate_Ymd", Extend: IB_Preset.YMD, Width: 110 },
      { Header: "Ym",  Name: "sDate_Ym",  Extend: IB_Preset.YM,  Width: 90 },
      { Header: "Md",  Name: "sDate_Md",  Extend: IB_Preset.MD,  Width: 90 } 
    ]
  };

  sheetData = [
    // Your data
  ];

  customStyle = {
    width: '100%',
    height: '600px',
    border: '1px solid #ccc'
  };

  onSheetReady(sheet: any): void {
    console.log('Sheet instance ready:', sheet);
    this.sheet = sheet;
    
    // Set up event listeners or perform initial operations
    if (sheet.addEventListener) {
      sheet.addEventListener('onAfterChange', (event: any) => {
        console.log('Data changed value:', event.val);
      });
    }
  }

  addRow(): void {
    if (this.sheet && this.sheet.addRow) {
      this.sheet.addRow();
    }
  }

  getData(): void {
    if (this.sheet && this.sheet.getDataRows) {
      const data = this.sheet.getDataRows();
      console.log('Sheet data:', data);
    }
  }
}
```

## Input Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `options` | `IBSheetOptions` | ✅ | - | IBSheet configuration options |
| `data` | `any[]` | ❌ | `[]` | Initial data for the spreadsheet |
| `sync` | `boolean` | ❌ | `false` | Enable data synchronization |
| `style` | `any` | ❌ | `{ width: '100%', height: '800px' }` | Container styling object |

## Output Events

| Event | Type | Description |
|-------|------|-------------|
| `sheetInstance` | `EventEmitter<any>` | Emitted when the IBSheet instance is created and ready |

## Component Lifecycle

The component follows Angular's lifecycle hooks:

1. **ngOnInit**: Validates required inputs and initializes component properties
2. **ngAfterViewInit**: Creates the container div and initializes the IBSheet
3. **ngOnDestroy**: Automatically disposes of the IBSheet instance to prevent memory leaks

## TypeScript Support

Define your IBSheet options interface:

```typescript
export interface IBSheetOptions {
  Cfg?: IBSheetProperties;
  Def?: object;
  Cols?: IBCol[];
  LeftCols?: IBCol[];
  RightCols?: IBCol[];
  Head?: any[];
  Foot?: any[];
  Solid?: any[];
  Filter?: any[];
  Events?: IBSheetEvents;
}
```

## Standalone Component

This component is built as an Angular standalone component, making it easy to use without module declarations:

```typescript
import { IBSheetAngular } from './ibsheet-angular.component';

@Component({
  // ...
  imports: [IBSheetAngular], // Direct import
})
```

## Error Handling

The component includes comprehensive error handling:

- **Input Validation**: Throws an error if required `options` input is not provided
- **Initialization Retry**: Retries IBSheet initialization up to 50 times (5 seconds total)
- **Safe Disposal**: Safely disposes of IBSheet instances with error catching
- **Console Logging**: Provides detailed error messages for debugging

### Default Styling

The component applies default dimensions of 100% width and 800px height.

## Module Integration (Traditional Modules)

If you're using traditional Angular modules instead of standalone components:

```typescript
import { NgModule } from '@angular/core';
import { IBSheetAngular } from './ibsheet-angular.component';

@NgModule({
  imports: [IBSheetAngular], // Import the standalone component
  // ...
})
export class YourModule { }
```

## Important Notes

1. **IBSheet Library**: Ensure the IBSheet library is loaded in your application before this component initializes
2. **Unique IDs**: Each component instance generates unique container and sheet IDs to prevent conflicts
3. **Memory Management**: The component automatically cleans up resources on destroy
4. **Async Initialization**: The component handles asynchronous IBSheet loading with automatic retries

## Troubleshooting

### Component not initializing

- Verify IBSheet library is loaded before component initialization
- Check browser console for error messages
- Ensure `options` input contains valid IBSheet configuration

### IBSheet library not found

```
[initializeIBSheet] IBSheet Initialization Failed: Maximum Retry Exceeded
```

**Solutions:**
- Confirm IBSheet script is loaded in your `index.html`
- Check network requests to ensure IBSheet files are accessible
- Verify IBSheet version compatibility

### Performance optimization

- Use `sync: false` for large datasets
- Consider implementing virtual scrolling for very large data sets
- Use OnPush change detection strategy when possible

### Memory leaks

The component automatically handles cleanup, but ensure you:
- Don't hold references to the sheet instance after component destruction
- Remove any custom event listeners you've added

## Best Practices

1. **Error Handling**: Always handle the `sheetInstance` event to capture initialization errors
2. **Performance**: Set `sync: false` unless real-time synchronization is required
3. **Styling**: Use CSS classes instead of inline styles for better maintainability
4. **Data Management**: Keep data immutable and update through Angular's change detection

## License

[MIT](./LICENSE)