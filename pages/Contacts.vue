<template>
  <section id="contacts">
    <ContactsInfo :title="$options.DATA.title" :info="$options.DATA.items" />
    <ContactsAddress
      :address="$options.DATA.address"
      :socials="$options.DATA.socials"
    />
    <ContactsHelp
      :title="$options.DATA.help.title"
      :description="$options.DATA.help.description"
      :link="$options.DATA.help.link"
      :img="$options.DATA.help.img"
    />
  </section>
</template>

<script>
import ContactsInfo from '~/modules/contacts/Info.vue'
import ContactsAddress from '~/modules/contacts/Address.vue'
import ContactsHelp from '~/modules/contacts/Help.vue'

export default {
  components: { ContactsInfo, ContactsHelp, ContactsAddress },
  DATA: {
    title: 'Контакты',
    items: [
      {
        title: 'email',
        value: 'help@absolute-help.ru',
        type: 'email',
      },
      {
        title: 'телефон',
        value: '+7 (495) 803-20-30',
        type: 'phone',
      },
      {
        title: 'ИИН',
        value: '5003039076',
        type: 'text',
      },
      {
        title: 'ОГРН',
        value: '1035000907204',
        type: 'text',
      },
    ],
    address: [
      {
        title: 'адрес',
        value: 'Москва, Лужнецкая набережная, 2/4 стр 4, офис 300',
      },
      {
        title: 'юридический адрес',
        value:
          '143085, Московская область, Одинцовский район, Рабочий поселок Заречье, д.8, 1 этаж, к.18',
      },
    ],
    socials: [
      {
        text: 'facebook',
        link: '#',
        icon: 'fb',
      },
      {
        text: 'вконтакте',
        link: '#',
        icon: 'vk',
      },
      {
        text: 'instagram',
        link: '#',
        icon: 'inst',
      },
      {
        text: 'youtube',
        link: '#',
        icon: 'ytb',
      },
    ],
    help: {
      title: 'Адресная помощь',
      img: '/img/contacts-help.png',
      description:
        'Для нас важно оказать поддержку, когда ресурсов семьи не хватает, а помощь нужна срочно.',
      link: {
        text: 'мне нужна помощь',
        href: '#',
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
