import { Component, signal } from '@angular/core';
import { IBSheetAngular, IB_Preset, type IBSheetInstance, type IBSheetOptions } from '../../../../dist/ibsheet-angular';

const Data = [{"TextData":"장순연","ComboData":"01","ISO":"AUD","Currency":"호주 달러","IntData":0,"FloatData":15.25,"DateData":"","PhoneNo":"01075116521","IDNO":"7801221384251","LinkData":"|./confirm.do|확정|_self ","LinesData":"전국이 대체로 흐리거나 구름많은 가운데 대기불안정으로 중부내륙은 아침과 오후 한때, 남부내륙은 오후 한때 소나기가 오는 곳이 있겠습니다.","Userformat":"1234567890","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/am.jpg|||||./nt/gripInTran.do|_self","PassData":123456,"RadioData":"H:1","CheckData":1},{"TextData":"김정호","ComboData":"02","ISO":"ALL","Currency":"알바니아 렉","IntData":0,"FloatData":234,"DateData":"20100120","PhoneNo":"","IDNO":"6807151852148","LinkData":"|./delayCos.do|재고|_self ","LinesData":"중부지방은 장마전선의 영향을 받겠고, 남부지방은 북태평양 고기압의 가장자리에 들겠습니다.","Userformat":"1111155555","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/am.jpg|||||","PassData":"75646","RadioData":"M:1","CheckData":0},{"TextData":"정상호","ComboData":"01","ISO":"DZD","Currency":"알제리 디나르","IntData":65,"FloatData":123,"DateData":"20020815","PhoneNo":"025815421","IDNO":"1138206820","LinesData":"중부지방은 장마전선의 영향을 받겠고, 남부지방은 북태평양 고기압의 가장자리에 들겠습니다.중부지방과 경북북부는 흐리고 비가 오겠으며, 그 외 남부지방은 구름많은 가운데 오후 한때 전라도와 제주도를 중심으로 소나기가 오겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ca.jpg|||||","PassData":"4564","RadioData":"L:1","CheckData":1},{"TextData":"안수현","ComboData":"02","ISO":"ARS","Currency":"아르헨티나 페소","IntData":190,"FloatData":0,"DateData":"20110526","PhoneNo":"","IDNO":"6098204963","LinesData":"일본 남쪽해상에 위치한 고기압의 가장자리에 들겠으나, 제주도는 약한 기압골의 영향을 받다가 점차 벗어나겠습니다.","LinkData":"|./acceptCos.do|확정|_self ","Userformat":"9898554321","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ca.jpg|||||","PassData":"123456","RadioData":"L:1","CheckData":1},{"TextData":"박만우","ComboData":"02","ISO":"AWG","Currency":"아루바 플로린","IntData":1120,"FloatData":115.25,"DateData":"20100922","PhoneNo":"0425741245","IDNO":"","LinesData":"서해상에 위치한 고기압의 영향을 받겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/fe.jpg|||||","PassData":"75646","RadioData":"M:1","CheckData":0},{"TextData":"최호건","ComboData":"01","ISO":"GBP","Currency":"영국 파운드","IntData":65,"FloatData":154.36,"DateData":"","PhoneNo":"","IDNO":"6405142384211","LinesData":"","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ch.jpg|||||","PassData":"4564","RadioData":"H:1","CheckData":0},{"TextData":"이민후","ComboData":"01","ISO":"BSD","Currency":"바하마 달러","IntData":0,"FloatData":0,"DateData":"","PhoneNo":"01022116587","IDNO":"7801221384251","LinkData":"|./rejectCos.do|반려|_self ","LinesData":"전국이 흐리고 오전에 전라남도와 제주도에 비가 그치기 시작해 늦은 오후에는 대부분 지역에서 그치겠으나, 강원영동과 경북북부동해안은 늦은 밤까지 이어지겠습니다.","Userformat":"5552221230","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/fe.jpg|||||","PassData":"","RadioData":"H:1","CheckData":1},{"TextData":"김호정","ComboData":"02","ISO":"BHD","Currency":"바레인 디나르","IntData":1120,"FloatData":0,"DateData":"20100922","PhoneNo":"0557256541","IDNO":"8506243051223","LinesData":"전국이 흐리고 새벽에 제주도에 비가 시작되어 오전에 남부지방, 오후에는 전국으로 확대되겠으나, 동풍의 영향을 받는 강원영동은 새벽부터 비가 오겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ru.jpg|||||","PassData":"75646","RadioData":"M:1","CheckData":0},{"TextData":"김호수","ComboData":"01","ISO":"BDT","Currency":"방글라데시 타카","IntData":65,"FloatData":154.36,"DateData":"","PhoneNo":"","IDNO":"","LinkData":"|./rejectCos.do|반려|_self ","LinesData":"전국에 구름이 많은 가운데, 대기불안정으로 전남과 경남내륙, 제주도에는 오후 한때 소나기가 오겠습니다.","Userformat":"8949598981","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ru.jpg|||||","PassData":"4564","RadioData":"L:1","CheckData":1},{"TextData":"오미려","ComboData":"01","ISO":"BBD","Currency":"바베이도스 달러","IntData":190,"FloatData":15.25,"DateData":"20110526","PhoneNo":"0262642080","IDNO":"2118204825","LinesData":"중북부지방은 동해상에 위치한 고기압의 가장자리에 들겠고, 충청이남지방은 장마전선의 영향을 받다가 제 5호 태풍 ‘다나스‘의 영향을 점차 받겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ru.jpg|||||","PassData":"123456","RadioData":"H:1","CheckData":1},{"TextData":"차수식","ComboData":"02","ISO":"BYR","Currency":"벨라루스 루블","IntData":1120,"FloatData":115.25,"DateData":"20100922","PhoneNo":"0261254045","IDNO":"","LinesData":"","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ko.jpg|||||","PassData":"75646","RadioData":"L:1","CheckData":0},{"TextData":"맹인주","ComboData":"01","ISO":"BZD","Currency":"벨리즈 달러","IntData":65,"FloatData":154.36,"DateData":"","PhoneNo":"","IDNO":"1298261319","LinesData":"중북부지방은 동해상에 위치한 고기압의 가장자리에 들겠으나, 충청이남지방은 장마전선의 영향을 점차 받겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/er.jpg|||||","PassData":"4564","RadioData":"H:1","CheckData":0},{"TextData":"전명준","ComboData":"01","ISO":"BMD","Currency":"버뮤다 달러","IntData":190,"FloatData":15.25,"DateData":"20110526","PhoneNo":"022222222","IDNO":"7507142063425","LinesData":"중부지방은 동해상에 위치한 고기압의 가장자리에 들겠으나, 남부지방은 장마전선의 영향을 받겠습니다.","Userformat":"5415554321","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/fe.jpg|||||","PassData":"123456","RadioData":"M:1","CheckData":1}];

@Component({
  selector: 'app-root',
  imports: [IBSheetAngular],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected readonly title = signal('demo');

  Options: IBSheetOptions = {
    Cfg : {
      SearchMode:2
    },
    Cols : [
      {"Header": "문자열(Text)","Type": "Text","Name": "TextData","Width": 100,"Align": "Center","CanEdit": 1},
      {"Header": "줄넘김문자열(Lines)","Type": "Lines","Name": "LinesData","MinWidth": 250,"Align": "Center","CanEdit": 1,"RelWidth": 1},
      {"Header": "콤보(Enum)","Type": "Enum","Name": "ComboData","Width": 100,"Align": "Right","Enum": "|대기|진행중|완료","EnumKeys": "|01|02|03"},
      { Header: "Ymd", Name: "sDate_Ymd", Extend: IB_Preset.YMD, Width: 110 },
      { Header: "Ym",  Name: "sDate_Ym",  Extend: IB_Preset.YM,  Width: 90 },
      { Header: "Md",  Name: "sDate_Md",  Extend: IB_Preset.MD,  Width: 90 }  
    ]
  }

  Style = {
    width: '100%',
    height: '500px'
  }

  onSheetReady(sheetInstance: IBSheetInstance) {
    console.log('IBSheet 인스턴스 전달 받음:', sheetInstance);
    // 여기서 sheetInstance를 저장하거나, 메소드 호출 가능
    sheetInstance.loadSearchData(Data)
  }
}
