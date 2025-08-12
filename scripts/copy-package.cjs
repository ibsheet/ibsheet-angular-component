const fs = require('fs')
const path = require('path')

const basePackage = require('../package.json')

// 필요한 필드만 추출
const distPackage = {
  name: "@ibsheet/angular",
  version: basePackage.version,
  license: basePackage.license,
  author: "IB Leaders <support@ibleaders.co.kr>",
  keywords: [
    "angular",
    "ibsheet",
    "grid",
    "component"
  ],
  repository: {
    "type": "git",
    "url": "https://github.com/ibsheet/ibsheet-angular-component.git"
  },
  bugs: {
    "url": "https://github.com/ibsheet/ibsheet-angular-component/issues"
  },
  homepage: "https://www.ibsheet.com/",
  module: "fesm2022/ibsheet-angular.mjs",
  typings: "index.d.ts",
  exports: {
    ".": {
      types: "./index.d.ts",
      default: "./fesm2022/ibsheet-angular.mjs",
      import: "./fesm2022/ibsheet-angular.mjs",
      require: "./fesm2022/ibsheet-angular.mjs"
    },
    "./package.json": {
      "default": "./package.json"
    }
  },
  peerDependencies: {
    "@angular/common": ">=17.0.0",
    "@angular/core": ">=17.0.0"
  },
  dependencies: {
    "tslib": ">=2.3.0",
    "@ibsheet/interface": ">=1.0.0"
  },
  sideEffects: ["**/*.js"]
}

fs.writeFileSync(
  path.resolve(__dirname, '../dist/ibsheet-angular/package.json'),
  JSON.stringify(distPackage, null, 2)
)