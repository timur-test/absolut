<template>
  <div id="history" class="history">
    <HistorySlider :items="$options.historyList" />
  </div>
</template>

<script>
import HistorySlider from '~/modules/history/HistorySlider.vue'

export default {
  historyList: [
    {
      year: 2002,
      text: '',
      changes: [],
      img: 'history-2002.png',
      slider: [],
      list: ['создание благотворительного фонда «Абсолют помощь»'],
    },
    {
      year: 2003,
      text: 'Ремонт детских домов и санаториев, после и до ремонта',
      changes: [
        'https://i.imgur.com/s08MkXC.jpg',
        'https://i.imgur.com/PfIWek4.jpg',
      ],
      img: '',
      slider: [],
      list: ['поддержка медицинских центров, детских домов и интер­натов'],
    },
    {
      year: 2004,
      text: '',
      changes: [],
      img: 'history-2004-img.png',
      slider: [],
      list: ['начало проекта «поддержка детского спорта»'],
    },
    {
      year: 2005,
      text: '',
      changes: [],
      img: '',
      slider: [],
      list: ['старт проекта «одаренные дети»'],
    },
    {
      year: 2006,
      text: '',
      changes: [],
      img: '',
      slider: [],
      list: [
        'внедрение комплекса мероприятий по развитию детского творчества в коррекционных учреждениях',
      ],
    },
    {
      year: 2008,
      text: '',
      changes: [],
      img: '',
      slider: [
        'history-2008-img.png',
        'history-2008-img.png',
        'history-2008-img.png',
      ],
      list: ['начало проекта «поддержка детского спорта»'],
    },
    {
      year: 2009,
      text: '',
      changes: [],
      img: '',
      slider: [],
      list: ['запуск программы «образование»'],
    },
    {
      year: 2011,
      text: '',
      changes: [],
      img: '',
      slider: [],
      list: ['внедрение программы «социализация» для детей с особыми потребностями'],
    },
    {
      year: 2012,
      text: '',
      changes: [],
      img: '',
      slider: [],
      list: ['начало реализации программы «профориентация»'],
    },
    {
      year: 2014,
      text: 'открытие школы «Абсолют» ',
      changes: [],
      img: '',
      slider: [
        'history-2014-img.png',
        'history-2014-img.png',
        'history-2014-img.png',
        'history-2014-img.png'
      ],
      list: [
        'открытие школы «Абсолют»',
        'организация детских интеграционных лагерей',
      ],
    },
    {
      year: 2016,
      text: '',
      changes: [],
      img: '',
      slider: [],
      list: ['проведение конкурса социально значимых проектов'],
    },
    {
      year: 2017,
      text: '',
      changes: [],
      img: 'history-2017-img.png',
      slider: [],
      list: [
        'сотрудничество с медицинскими федеральными центрами',
        'формирование системы сопровождения детей',
      ],
    },
    {
      year: 2018,
      text: '',
      changes: [],
      img: '',
      slider: [
        'history-2018-img.png',
        'history-2018-img.png',
        'history-2018-img.png',
      ],
      list: [
        'поддержка внедрения и распространения в России лучших мировых практик помощи детям',
      ],
    },
    {
      year: 2019,
      text: '',
      changes: [],
      img: 'history-2019-img.png',
      slider: [],
      list: [
        'поддержка родительских и экспертных организаций',
        'повышение уровня компетенций специалистов, информирование и просвещение общества',
      ],
    },
    {
      year: 2020,
      text: '',
      changes: [],
      img: 'history-2020-img.png',
      slider: [],
      list: [
        'проведение первого масштабного открытого грантового конкурса с использованием лицензированной цифровой платформы',
        '3-е место в номинации «Лучший грантовый конкурс» на XIII Ежегодном Конкурсе «Лидеры корпоративной благотворительности»',
        'старт направления по оказанию адресной помощи подопечным из проектов-грантополучателей',
      ],
    },
  ],
  name: 'History',
  components: { HistorySlider },
}
</script>

<style lang="scss">
.history {
  background: #fff;
}
</style>
