import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterModule, NgbNavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'seyyah';
  text: string ; 
  sehir: string = ""; 
  gun: string  ="" ;
  butce: string = "";

  jsonResponse: any[] = [];
  genAI = new GoogleGenerativeAI("AIzaSyAtXrRiulYYZnFtGKBK-kcOsJx85GIxzvM");
  constructor() { }
  newLis: any[] = [
    // {
    //   gun: "1. gün",
    //   content:
    //   {
    //     sabah: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     },
    //     ogle: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     },
    //     aksam: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     }
    //   }
    // },
    // {
    //   gun: "2. gün",
    //   content:
    //   {
    //     sabah: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     },
    //     ogle: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     },
    //     aksam: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     }
    //   }
    // },
    // {
    //   gun: "3. gün",
    //   content:
    //   {
    //     sabah: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     },
    //     ogle: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     },
    //     aksam: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     }
    //   }
    // },
    // {
    //   gun: "4. gün",
    //   content:
    //   {
    //     sabah: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     },
    //     ogle: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     },
    //     aksam: {
    //       title: "Anıtkabir",
    //       description: "Çok güzel Bir yer"
    //     }
    //   }
    // }
  ]
  porpt1 = `
  Bir kişi ${this.sehir} de/da ${this.gun} gün sürecek bir gezi planlıyor ${this.butce} tl civarı bir bütçesi var 
  bu kişi için bir tatil planı hazırla kullanıcıya o şehirde gezebileceği yerleri tatil kaç günlük olacaksa o kadar olacak şekilde planla geri dönüş değeri aşağıdaki json formatında olsun
  {
    "gün": {
      "trip-time"
      "gezi": [
        {
          "title": string,
          "image": string,
          "description": string,
          "konum": string,
          "tarih": string,
          "cafe": [
            {
              "name":string
              "konum:": string
            }
          ]
  
        }
      ]
    }
  }
`
propt2 = `
Bir kişi ${this.sehir} de/da ${this.gun} gün sürecek bir gezi planlıyor ${this.butce} tl civarı bir bütçesi var 
  bu kişi için bir tatil planı hazırla kullanıcıya o şehirde gezebileceği yerleri tatil kaç günlük olacaksa o kadar olacak şekilde planla dönüş değeri kesinlikle  aşağıda senden istediğim json tipinde olsun projemde javascript listesini döndürmem gerekeceği için en önemli adım bu . Dönüş değerin kesinlike aşağıdaki json tipinde olmalı 
  {
    gun: string,
    content:
    {
      sabah: {
        title: string,
        description: string
      },
      ogle: {
        title: string,
        description:string
      },
      aksam: {
        title: string,
        description: string
      }
    }
  }
  `
  async run() {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
    Bir kişi ${this.sehir} de/da ${this.gun} gün sürecek bir gezi planlıyor ${this.butce} tl civarı bir bütçesi var 
      bu kişi için bir tatil planı hazırla kullanıcıya o şehirde gezebileceği yerleri tatil kaç günlük olacaksa o kadar olacak şekilde planla dönüş değeri kesinlikle  aşağıda senden istediğim json tipinde olsun projemde javascript listesini döndürmem gerekeceği için en önemli adım bu . Dönüş değerin kesinlike aşağıdaki json tipinde olmalı 
      {
        gun: string,
        content:
        {
          sabah: {
            title: string,
            description: string
          },
          ogle: {
            title: string,
            description:string
          },
          aksam: {
            title: string,
            description: string
          }
        }
      }
      `
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/^'|'$|^\s*```\s*json\s*|\s*```$/gm, '');
    this.newLis = JSON.parse(cleanedText)

    console.log(text);

  }
}
