import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Импортируем CommonModule для *ngFor
import { RouterModule } from '@angular/router'; // Импорт RouterModule
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Добавляем CommonModule
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
  
})
export class EventsComponent {
  events = [
    { 
      id: 1, 
      name: 'Волонтерская помощь в приюте', 
      date: '12 апреля 2025', 
      location: 'Городской приют',
      image: 'https://i.pinimg.com/736x/84/97/bc/8497bc190312a4f07cc7e7451e05cd68.jpg'  // Публичная ссылка на изображение
    },
    { 
      id: 2, 
      name: 'Экологическая акция', 
      date: '20 апреля 2025', 
      location: 'Парк "Зеленый угол"',
      image: 'https://imapress.media/wp-content/uploads/2019/04/7b2af9b917ae264586f39356e4ab11c8.jpg'  // Публичная ссылка на изображение
    },
    { 
      id: 3, 
      name: 'Благотворительный концерт', 
      date: '5 мая 2025', 
      location: 'Культурный центр',
      image: 'https://sh-priuralskaya-novouralsk-r56.gosweb.gosuslugi.ru/netcat_files/47/237/blag.kontsert.jpg'  // Публичная ссылка на изображение
    },
    { 
      id: 4, 
      name: 'Волонтерская помощь в приюте', 
      date: '15 мая 2025', 
      location: 'Городской приют',
      image: 'https://avatars.mds.yandex.net/i?id=16d3501e271af5060580b65279ae603f_l-12577662-images-thumbs&n=13'  // Публичная ссылка на изображение
    },
    { 
      id: 5, 
      name: 'Чистка пляжа', 
      date: '25 июня 2025', 
      location: 'Пляж "Солнечный"',
      image: 'https://i.pinimg.com/736x/ee/2b/a0/ee2ba0d6751771aa4dcf53a9ec62f032.jpg'  // Публичная ссылка на изображение
    },
    { 
      id: 6, 
      name: 'Благотворительная ярмарка', 
      date: '10 июля 2025', 
      location: 'Центральная площадь',
      image: 'https://gazetazp.ru/files/file/thumbs/940x650_outbound_e188070d7ec25fe02fd065da69b1bf2a.jpg'  // Публичная ссылка на изображение
    },
    { 
      id: 7, 
      name: 'Волонтерская помощь в доме престарелых', 
      date: '1 августа 2025', 
      location: 'Дом престарелых "Старый мир"',
      image: 'https://avatars.mds.yandex.net/i?id=8b3359649d3edd9525c115b6704dd630_l-5331218-images-thumbs&n=13'  // Публичная ссылка на изображение
    },
    { 
      id: 8, 
      name: 'Культурная акция в парке', 
      date: '15 сентября 2025', 
      location: 'Парк культуры и отдыха',
      image: 'https://cdn.culture.ru/images/430a236b-3e9b-505f-a67a-24b0eefbe499'  // Публичная ссылка на изображение
    },
    { 
      id: 9, 
      name: 'Экологический марафон', 
      date: '10 октября 2025', 
      location: 'Городской парк',
      image: 'https://avatars.mds.yandex.net/i?id=e277b32fe2e313aedbf58e8013e79d3c_l-12322312-images-thumbs&n=13'  // Публичная ссылка на изображение
    },
    { 
      id: 10, 
      name: 'Помощь бездомным', 
      date: '5 ноября 2025', 
      location: 'Городской центр помощи',
      image: 'https://sun9-53.userapi.com/s/v1/ig2/uxNbNhmfNtpza7fEPkkSmXwKgQbqJE0wq9aFM4AMnTxg6oUjpUCYe0jhqIfNmZXXebBEGJMzCCUBNOXnVPszX6ib.jpg?quality=96&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x426,720x480,1080x719,1280x853,1440x959,1920x1279&from=bu&u=GCkSYDNSi2t-U0W2P-6SHBhKnnU9oyjF5asoszmO0pE&cs=807x538'  // Публичная ссылка на изображение
    },
    { 
      id: 11, 
      name: 'Конкурс творчества', 
      date: '20 декабря 2025', 
      location: 'Культурный центр',
      image: 'https://sun9-3.userapi.com/impg/zrk7-lIjaApzRaUIR_Xjd17S3f5v_xiC-U28OQ/DM5imdRCYNY.jpg?size=807x361&quality=95&sign=641419fb4fd13876aa9b8d0f7440d2cb&c_uniq_tag=skDXz8CVijnFJo4GM1JSUCyRFuzpR_nswRZBbwXgia8&type=album'  // Публичная ссылка на изображение
    },
    { 
      id: 12, 
      name: 'День здоровья', 
      date: '10 января 2026', 
      location: 'Фитнес-центр',
      image: 'https://cdn.er.ru/media/news/April2025/Lf6TOjF2k1LDjDJFjIez.JPG'  // Публичная ссылка на изображение
    },
    { 
      id: 13, 
      name: 'Фестиваль кино', 
      date: '20 февраля 2026', 
      location: 'Кинотеатр "Энергия"',
      image: 'https://cdn.culture.ru/images/1136fd9a-cb12-565c-84a1-7d278aaf0966'  // Публичная ссылка на изображение
    },
    { 
      id: 14, 
      name: 'Концерт классической музыки', 
      date: '15 марта 2026', 
      location: 'Концертный зал "Лира"',
      image: 'https://avatars.mds.yandex.net/i?id=ed5963cb3d45d8d2dc5bda2c0e0f48d6_l-5875605-images-thumbs&n=13'  // Публичная ссылка на изображение
    },
    { 
      id: 15, 
      name: 'Флешмоб на площади', 
      date: '5 апреля 2026', 
      location: 'Главная площадь',
      image: 'https://avatars.mds.yandex.net/i?id=67dcd6d9fa969ed857e017f1fb0e21ec_l-5306514-images-thumbs&n=13'  // Публичная ссылка на изображение
    },
    { 
      id: 16, 
      name: 'Благотворительный марафон', 
      date: '20 апреля 2026', 
      location: 'Городская площадь',
      image: 'https://uprobraznlomov.ru/wp-content/uploads/2022/11/5f13bed943880e155c8056a893d14af2FZjfp-445x265.png'  // Публичная ссылка на изображение
    }
  ];

  viewEventDetails(id: number): void {
    console.log('Посмотреть подробности мероприятия с ID:', id);
  }
  registerForEvent(id: number): void {
    console.log('Регистрация на мероприятие с ID:', id);
    // Логика для регистрации, например, открытие формы или подтверждения
  }
}